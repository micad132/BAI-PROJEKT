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
import { sanitizeData } from '../../services/validators/validator.ts';
import api from '../../services/api/AxiosApi.ts';
import PasswordInfo from '../../components/passwordInfo.component.tsx';

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
    align-items: center;
    & > *:not(label) {
      width: 80% !important;
      margin: 0 auto;
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
    username, password, confirmPassword, name, surname, workplace,
  } = loginData;
  const [isLoginSending, setIsLoginSending] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  const onChangeHandler = (type: string, isSafe: boolean = true) => (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevState) => ({
      ...prevState,
      [type]: isSafe ? sanitizeData(e.target.value) : e.target.value,
    }));
  };

  const onSubmitHandler = async (e: any) => {
    e.preventDefault();
    const newData = {
      login: username,
      password,
      name,
      surname,
      workplace,
    };
    try {
      if (isSafeRegister) {
        console.log('WBILEM');
        setIsLoginSending(true);
        const data = await api.post('http://localhost:8000/Account/create', newData, { headers: { 'Content-type': 'application/json' } });
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
      } else {
        console.log('WBILEM');
        setIsLoginSending(true);
        const data = await api.post('http://localhost:8000/Account/create-unsafe', newData, { headers: { 'content-type': 'application/x-www-form-urlencoded' } });
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
      }
    } catch (error: any) {
      console.log(error.response);
      if (error.response.status === 400 && error.response.data.detail === 'Passoword not allowed') {
        toast({
          title: 'Password not allowed!',
          status: 'error',
          description: <div>
            <h2>Password Requirements:</h2>
            <ul>
              <li>Minimum 12 characters</li>
              <li>At least one lowercase letter</li>
              <li>At least one uppercase letter</li>
              <li>At least one digit</li>
              <li>At least one special character</li>
            </ul>
          </div>,
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      }
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
        <InputComponent placeholder="Type your name here..." value={name} onChange={onChangeHandler('name')} />
        <InputComponent placeholder="Type your surname here..." value={surname} onChange={onChangeHandler('surname')} />
        <InputComponent placeholder="Type your workplace here..." value={workplace} onChange={onChangeHandler('workplace')} />
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
        <InputComponent placeholder="Type your username here..." value={username} onChange={onChangeHandler('username', false)} />
        <InputComponent placeholder="Type your password here..." value={password} onChange={onChangeHandler('password', false)} isPassword />
        <InputComponent placeholder="Confirm your password" value={confirmPassword} onChange={onChangeHandler('confirmPassword', false)} isPassword />
        <InputComponent placeholder="Type your name here..." value={name} onChange={onChangeHandler('name', false)} />
        <InputComponent placeholder="Type your surname here..." value={surname} onChange={onChangeHandler('surname', false)} />
        <InputComponent placeholder="Type your workplace here..." value={workplace} onChange={onChangeHandler('workplace', false)} />
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
