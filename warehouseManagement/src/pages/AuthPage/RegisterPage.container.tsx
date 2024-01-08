import {
  FormControl,
  FormLabel,
  Button, useToast, Checkbox,
} from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { INITIAL_REGISTER_VALUES, RegisterData } from '../../models/Auth.model.ts';
import InputComponent from '../../components/input.component.tsx';
import AuthPageWrapperComponent from '../../components/authPageWrapper.component.tsx';

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
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > *:not(label) {
      width: 80% !important;
      margin: 0 auto;
      color: #fff;
    }
`;

const CustomLabel = styled(FormLabel)`
  padding: 0px;
  text-align: center; 
`;

const RegisterPageContainer = () => {
  const [isSafeRegister, setIsSafeRegister] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<RegisterData>(INITIAL_REGISTER_VALUES);
  const {
    username, password, confirmPassword,
  } = loginData;
  const [isLoginSending, setIsLoginSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [type]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    try {
      console.log('WBILEM');
      setIsLoginSending(true);
      const data = await axios.post('http://localhost:8000/Account/create', { login: 'jach', password: 'ilovelewica' }, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
      console.log('DATA', data);
      toast({
        title: 'Successfully registered!',
        status: 'success',
        description: 'Now you can log in',
        duration: 3000,
        isClosable: true,
        position: 'top-right',
      });
      navigate('/login');
    } catch (re) {
      console.log(re);
    }

    setIsLoginSending(false);
    setLoginData(INITIAL_REGISTER_VALUES);
  };

  const mainContent = isSafeRegister ? (
    <FormWrapper onSubmit={onSubmitHandler}>
      <FormControlWrapper>
        <FormLabel>Safe Register</FormLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username')} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password')} isPassword />
        <InputComponent placeholder="Confirm your password" value={confirmPassword} onChange={onChangeHandler('confirmPassword')} isPassword />
        <Button
          isLoading={isLoginSending}
          type="submit"
          loadingText="Submitting..."
        >
          Register
        </Button>
      </FormControlWrapper>
    </FormWrapper>
  ) : (
    <FormWrapper onSubmit={onSubmitHandler}>
      <FormControlWrapper>
        <CustomLabel>Unsafe Register</CustomLabel>
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username')} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password')} isPassword />
        <InputComponent placeholder="Confirm your password" value={confirmPassword} onChange={onChangeHandler('confirmPassword')} isPassword />
        <Button
          isLoading={isLoginSending}
          type="submit"
          loadingText="Submitting..."
        >
          Register
        </Button>
      </FormControlWrapper>
    </FormWrapper>
  );

  return (
    <AuthPageWrapperComponent>
      <Checkbox
        isChecked={isSafeRegister}
        onChange={() => setIsSafeRegister((prevState) => !prevState)}
      >
        Safe register?
      </Checkbox>
      <MainContentWrapper>
        {mainContent}
      </MainContentWrapper>
    </AuthPageWrapperComponent>
  );
};

export default RegisterPageContainer;
