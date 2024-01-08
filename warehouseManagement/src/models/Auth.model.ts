export type LoginData = {
  username: string,
  password: string,
};

export type RegisterData = {
  username: string,
  password: string,
  confirmPassword: string,
};

export const INITIAL_LOGIN_VALUES: LoginData = {
  username: '',
  password: '',
};

export const INITIAL_REGISTER_VALUES: RegisterData = {
  username: '',
  password: '',
  confirmPassword: '',
};
