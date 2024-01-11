export type LoginData = {
  username: string,
  password: string,
};

export type RegisterData = {
  username: string,
  password: string,
  confirmPassword: string,
  name: string,
  surname: string,
  workplace: string,
};

export const INITIAL_LOGIN_VALUES: LoginData = {
  username: '',
  password: '',
};

export const INITIAL_REGISTER_VALUES: RegisterData = {
  username: '',
  password: '',
  confirmPassword: '',
  name: '',
  surname: '',
  workplace: '',
};
