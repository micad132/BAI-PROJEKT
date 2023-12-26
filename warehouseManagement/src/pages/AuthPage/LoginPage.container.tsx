import {
  FormControl,
  FormLabel,
  Button, useToast, Checkbox,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import InputComponent from '../../components/input.component.tsx';
import { INITIAL_LOGIN_VALUES, LoginData } from '../../models/Auth.model.ts';
import SingleLinkComponent from '../../layout/nav/SingleLink.component.tsx';
import { useAppDispatch } from '../../store';
import { setLoggedUser } from '../../store/reducers/userReducer.tsx';
import AuthPageWrapperComponent from '../../components/authPageWrapper.component.tsx';
import { sanitizeData, validateLogin } from '../../services/validators/validator.ts';

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
  justify-content: center;
    & > *:not(label) {
      width: 80% !important;
      margin: 0 auto;
    }
`;

const CustomLabel = styled(FormLabel)`
  display: block;
  background-color: palevioletred;
  text-align: center;
`;

const LoginPageContainer = () => {
  const [isSafeLoginChecked, setIsSafeLoginChecked] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>(INITIAL_LOGIN_VALUES);
  const { username, password } = loginData;
  const [isLoginSending, setIsLoginSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onChangeHandler = (type: string, isSafe: boolean) => (e: ChangeEvent<HTMLInputElement>) => {
    console.log('E', e);
    setLoginData((prevState) => ({
      ...prevState,
      [type]: isSafe ? sanitizeData(e.target.value) : e.target.value,
    }));
  };

  const onSubmitHandler = (e: any) => {
    setIsLoginSending(true);
    e.preventDefault();
    const result = validateLogin(loginData);
    if (result.success) {
      setIsLoginSending(false);
      setLoginData(INITIAL_LOGIN_VALUES);
      toast({
        title: 'Pomyślnie zalogowano!',
        status: 'success',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      dispatch(setLoggedUser({
        username: 'mikad132',
        postalCode: '12-343',
        city: 'Kielce',
        phoneNumber: '123456789',
      }));
      navigate('/');
    } else {
      console.log('ERROR', result.error);
    }
  };

  const mainContent = isSafeLoginChecked ? (
    <FormWrapper onSubmit={onSubmitHandler}>
      <FormControlWrapper>
        <CustomLabel>Safe Login</CustomLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username', true)} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password', true)} />
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
    <FormWrapper onSubmit={onSubmitHandler}>
      <FormControlWrapper>
        <CustomLabel>Unsafe Login</CustomLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username', false)} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password', false)} />
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
