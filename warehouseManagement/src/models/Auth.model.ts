export type LoginData = {
    username: string,
    password: string,
}

export type RegisterData = {
    username: string,
    password: string,
    confirmPassword: string,
    postalCode: string,
    city: string,
    phoneNumber: string,
}

export const INITIAL_LOGIN_VALUES: LoginData = {
  username: '',
  password: '',
};

export const INITIAL_REGISTER_VALUES: RegisterData = {
  username: '',
  password: '',
  confirmPassword: '',
  postalCode: '',
  city: '',
  phoneNumber: '',
};
