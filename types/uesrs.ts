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

export interface CreateMeetingParamsType {
  title: string;
  content: string;
  file: string;
  day: string;
  cafeId: string;
  capacity: number;
  cost: string;
  time: string;
  kakaoUrl: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
}
