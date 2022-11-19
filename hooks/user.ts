import { useMutation, useQuery } from 'react-query';

import api from 'lib/api';
import { LoginParamsType, SingupParamsType, UserType } from 'types/uesr';
import { useSetRecoilState } from 'recoil';
import { userState } from 'recoil/user';

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation(
    ({ passwordConfirm, ...rest }: SingupParamsType) =>
      api.post(`/auth/signup`, rest),
  );

  return { signup, isLoading };
};

export const useLogin = () => {
  const setUserState = useSetRecoilState(userState);

  const { mutate: login, isLoading } = useMutation(
    (params: LoginParamsType) => api.post<UserType>(`/auth/login`, params),
    {
      onSuccess: (res) => {
        const { accessToken, refreshToken, userResponse } = res.data.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('refreshToken', refreshToken);
        setUserState(userResponse);
      },
    },
  );

  return { login, isLoading };
};

export const useUserDetail = () => {
  const { data } = useQuery(['tempKey'], () => api.get(`/users`));

  return { data };
};
