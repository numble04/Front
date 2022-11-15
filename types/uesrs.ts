export interface SingupParamsType {
  email: string;
  name: string;
  nickname: string;
  phone: string;
  password: string;
  passwordConfirm: string;
  region: string;
  city: string;
  dong: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
}
