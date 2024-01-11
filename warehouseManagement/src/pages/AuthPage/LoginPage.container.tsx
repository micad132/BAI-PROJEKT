import {
  FormControl,
  FormLabel,
  Button, useToast, Checkbox,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import InputComponent from '../../components/input.component.tsx';
import {
  INITIAL_LOGIN_VALUES, LoginData,
} from '../../models/Auth.model.ts';
import SingleLinkComponent from '../../layout/nav/SingleLink.component.tsx';
import { useAppDispatch } from '../../store';
import { setLoggedUser } from '../../store/reducers/userReducer.tsx';
import AuthPageWrapperComponent from '../../components/authPageWrapper.component.tsx';
import { sanitizeData, validateLogin } from '../../services/validators/validator.ts';
import { User } from '../../models/User.model.ts';
import api from '../../services/api/AxiosApi.ts';

type XSSExample = {
  htmlInput: string,
  evalExample: string,
};

const XSS_EXAMPLE_VALUES: XSSExample = {
  htmlInput: '',
  evalExample: '',
};

const MainContentWrapper = styled.div`
  background-color: #5B7B7A;
  width: 80% !important;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
`;

const FormWrapper = styled.form`
  width: 80% !important;
  margin: 0 auto;
  padding: 10px;
`;

const FormControlWrapper = styled(FormControl)`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    & > *:not(label) {
      width: 80% !important;
      margin: 0 auto;
    }
`;

const LoginPageContainer = () => {
  const [isSafeLoginChecked, setIsSafeLoginChecked] = useState<boolean>(true);
  const [loginData, setLoginData] = useState<LoginData>(INITIAL_LOGIN_VALUES);
  const [xssExample, setXssExample] = useState<XSSExample>(XSS_EXAMPLE_VALUES);
  const { username, password } = loginData;
  const [isLoginSending, setIsLoginSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onChangeHandler = (type: string, isSafe: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [type]: isSafe ? sanitizeData(e.target.value) : e.target.value,
    }));
  };

  const onSubmitHandler = async (e: any, safe: boolean) => {
    setIsLoginSending(true);
    e.preventDefault();
    try {
      if (safe) {
        console.log('SAFE');
        const { data } = await api.post('http://localhost:8000/SignIn', { username, password }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
        console.log('DATA', data);
        const loggedUserData: User = {
          email: data.email,
          name: data.name,
          role: data.role,
          surname: data.role,
          workplace: data.workplace,
        };
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        setIsLoginSending(false);
        setLoginData(INITIAL_LOGIN_VALUES);
        toast({
          title: 'Successfully logged!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        dispatch(setLoggedUser(loggedUserData));
        navigate('/');
      } else {
        console.log('UNSAFE', loginData.username);
        eval(loginData.username);
        eval(xssExample.htmlInput);
        eval('<script>alert(\'COS\');</script>');
        const { data } = await api.post('http://localhost:8000/SignIn-unsafe', { username, password }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
        console.log('DATA', data);
        const loggedUserData: User = {
          email: data.email,
          name: data.name,
          role: data.role,
          surname: data.role,
          workplace: data.workplace,
        };
        localStorage.setItem('accessToken', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
        setIsLoginSending(false);
        setLoginData(INITIAL_LOGIN_VALUES);
        toast({
          title: 'Successfully logged!',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
        dispatch(setLoggedUser(loggedUserData));
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: 'Login failed!',
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      setIsLoginSending(false);
      setLoginData(INITIAL_LOGIN_VALUES);
    }
  };

  function sprawdzTrybŚcisły() {
    return (function () { return !this; }()); // Sprawdzenie czy 'this' jest pustym obiektem (w trybie ścisłym 'this' jest undefined)
  }

  console.log(sprawdzTrybŚcisły());

  const mainContent = isSafeLoginChecked ? (
    <FormWrapper onSubmit={(e: any) => onSubmitHandler(e, true)}>
      <FormControlWrapper>
        <FormLabel>Safe Login</FormLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username', true)} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password', true)} isPassword />
        <Button
          isLoading={isLoginSending}
          type="submit"
          loadingText="Submitting..."
        >
          Login
        </Button>
        <SingleLinkComponent path="/register" text={'Don\'t have an account?'} />
      </FormControlWrapper>
    </FormWrapper>
  ) : (
    <FormWrapper onSubmit={(e: any) => onSubmitHandler(e, false)}>
      <FormControlWrapper>
        <FormLabel>Unsafe Login</FormLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username', false)} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password', false)} isPassword />
        <Button
          isLoading={isLoginSending}
          type="submit"
          loadingText="Submitting..."
        >
          Login
        </Button>
        <SingleLinkComponent path="/register" text={'Don\'t have an account?'} />
      </FormControlWrapper>
    </FormWrapper>
  );

  return (
    <AuthPageWrapperComponent>
      <Checkbox
        isChecked={isSafeLoginChecked}
        onChange={() => setIsSafeLoginChecked((prevState) => !prevState)}
      >
        Safe login?
      </Checkbox>
      <MainContentWrapper>
        {mainContent}
      </MainContentWrapper>
    </AuthPageWrapperComponent>
  );
};

export default LoginPageContainer;
