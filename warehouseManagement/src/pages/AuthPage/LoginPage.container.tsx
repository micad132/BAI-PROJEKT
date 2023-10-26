import {
    FormControl,
    FormLabel,
    Button
} from '@chakra-ui/react'
import InputComponent from "../../components/input.component.tsx";
import {ChangeEvent, useState} from "react";
import {INITIAL_LOGIN_VALUES, LoginData} from "../../models/Auth.model.ts";
import styled from "styled-components";
import SingleLinkComponent from "../../layout/nav/SingleLink.component.tsx";


const FormWrapper = styled.form`
  background-color: #5B7B7A;
  width: 60% !important;
  margin: 0 auto;
  border-radius: 10px;
`

const FormControlWrapper = styled(FormControl)`
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > * {
      width: 50% !important;
      margin: 0 auto;
    }
`

const LoginPageContainer = () => {
    const [loginData, setLoginData] = useState<LoginData>(INITIAL_LOGIN_VALUES);
    const { email, password} = loginData;
    const [isLoginSending, setIsLoginSending] = useState<boolean>(false);

    const onChangeHandler = (type: string) => (e: ChangeEvent<HTMLInputElement>) => {
        console.log('E', e);
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
            setLoginData(INITIAL_LOGIN_VALUES);
        }, 2000));
    }

    return(
        <FormWrapper onSubmit={onSubmitHandler}>
            <FormControlWrapper>
                <FormLabel>Login</FormLabel>
                <InputComponent placeholder='Type your email here...' value={email} onChange={onChangeHandler('email')} />
                <InputComponent placeholder='Type your password here...' value={password} onChange={onChangeHandler('password')} />
                <Button
                    isLoading={isLoginSending}
                    type="submit"
                    loadingText='Submitting...'
                >
                    Login
                </Button>
                <SingleLinkComponent  path='/register' text={`Don't have an account?`} />
            </FormControlWrapper>
        </FormWrapper>
    )
}

export default LoginPageContainer;
