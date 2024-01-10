export type LoginData = {
  username: string,
  password: string,
};

export type RegisterData = {
  username: string,
  password: string,
  confirmPassword: string,
};

export type XSSExample = {
  htmlInput: string,
  evalExample: string,
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

export const XSS_EXAMPLE_VALUES: XSSExample = {
  htmlInput: '',
  evalExample: '',
};
