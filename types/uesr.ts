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

export interface UserType {
  data: {
    accessToken: string;
    refreshToken: string;
    userResponse: UserResponseType;
  };
}

export interface UserResponseType {
  id: number;
  email: string;
  name: string;
  nickname: string;
  phone: string;
  region: string;
  city: string;
  dong: string;
  img?: string | null;
  introduction?: string | null;
}
