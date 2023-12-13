import {
    FormControl,
    FormLabel,
    Button, useToast
} from '@chakra-ui/react'
import InputComponent from "../../components/input.component.tsx";
import {ChangeEvent, useState} from "react";
import { INITIAL_REGISTER_VALUES, RegisterData} from "../../models/Auth.model.ts";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";


const FormWrapper = styled.form`
  background-color: #5B7B7A;
  width: 60% !important;
  margin: 0 auto;
  border-radius: 10px;
  padding: 10px;
  color: #fff;
`

const FormControlWrapper = styled(FormControl)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > * {
      width: 50% !important;
      margin: 0 auto;
      color: #fff;
    }
`

const RegisterPageContainer = () => {
    const [loginData, setLoginData] = useState<RegisterData>(INITIAL_REGISTER_VALUES);
    const { username, password, confirmPassword, city, postalCode, phoneNumber} = loginData;
    const [isLoginSending, setIsLoginSending] = useState<boolean>(false);
    const navigate = useNavigate();
    const toast = useToast();

    const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData((prevState) => ({
            ...prevState,
            [type]: e.target.value,
        }))
    }

    const onSubmitHandler = (e: any) => {
        setIsLoginSending(true);
        e.preventDefault();
        return new Promise(() => setTimeout(() => {
            setIsLoginSending(false);
            setLoginData(INITIAL_REGISTER_VALUES);
            toast({
                title: 'Pomyślnie zarejestrowano!',
                status: 'success',
                description: 'Teraz możesz się zalogować',
                duration: 3000,
                isClosable: true,
                position: 'top-right'
            })
            navigate("/login");
        }, 2000));
    }

    return(
        <FormWrapper onSubmit={onSubmitHandler}>
            <FormControlWrapper>
                <FormLabel>Register</FormLabel>
                <InputComponent placeholder='Type your username here...' value={username} onChange={onChangeHandler('username')} />
                <InputComponent placeholder='Type your password here...' value={password} onChange={onChangeHandler('password')} />
                <InputComponent placeholder='Confirm your password' value={confirmPassword} onChange={onChangeHandler('confirmPassword')} />
                <InputComponent placeholder='Type your postal code here...' value={postalCode} onChange={onChangeHandler('postalCode')} />
                <InputComponent placeholder='Type your city here...' value={city} onChange={onChangeHandler('city')} />
                <InputComponent placeholder='Type your phone number here...' value={phoneNumber} onChange={onChangeHandler('phoneNumber')} />
                <Button
                    isLoading={isLoginSending}
                    type="submit"
                    loadingText='Submitting...'
                >
                    Register
                </Button>
            </FormControlWrapper>
        </FormWrapper>
    )
}

export default RegisterPageContainer;
