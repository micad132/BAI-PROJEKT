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

const FormWrapper = styled.form`
  background-color: #5B7B7A;
  width: 80% !important;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
`;

const FormControlWrapper = styled(FormControl)`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > * {
      width: 50% !important;
      margin: 0 auto;
    }
`;

const LoginPageContainer = () => {
  const [isSafeLoginChecked, setIsSafeLoginChecked] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<LoginData>(INITIAL_LOGIN_VALUES);
  const { username, password } = loginData;
  const [isLoginSending, setIsLoginSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useAppDispatch();

  const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    console.log('E', e);
    setLoginData((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const onSubmitHandler = (e: any) => {
    setIsLoginSending(true);
    e.preventDefault();
    return new Promise(() => setTimeout(() => {
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
    }, 2000));
  };

  const mainContent = isSafeLoginChecked ? (
    <FormWrapper onSubmit={onSubmitHandler}>
      <FormControlWrapper>
        <FormLabel>Safe Login</FormLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username')} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password')} />
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
        <FormLabel>Unsafe Login</FormLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username')} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password')} />
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
      <FormWrapper>
        {mainContent}
      </FormWrapper>
    </AuthPageWrapperComponent>
  );
};

export default LoginPageContainer;
