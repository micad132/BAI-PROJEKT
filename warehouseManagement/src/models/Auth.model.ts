
export type LoginData = {
    email: string,
    password: string,
}

export type RegisterData = {
    email: string,
    password: string,
    confirmPassword: string,
    postalCode: string,
    city: string,
    phoneNumber: string,
}

export const INITIAL_LOGIN_VALUES: LoginData = {
    email: '',
    password: ''
}

export const INITIAL_REGISTER_VALUES: RegisterData = {
    email: '',
    password: '',
    confirmPassword: '',
    postalCode: '',
    city: '',
    phoneNumber: ''
}
