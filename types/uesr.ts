export interface SingupParamsType {
  email: string;
  emailDuplicate: boolean;
  name: string;
  nickname: string;
  nicknameDuplicate: boolean;
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

export interface UserDetail {
  data: {
    id: number;
    email: string;
    name: string;
    nickname: string;
    phone: string;
    img: string | null;
    region: string;
    city: string;
    dong: string;
    introduction: string | null;
  };
}
