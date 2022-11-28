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
  day: Date | null;
  cafeId: number | null;
  cafeName?: string;
  capacity: number;
  cost: number;
  time: number;
  kakaoUrl: string;
}

export interface LoginParamsType {
  email: string;
  password: string;
}
