import { useMutation } from 'react-query';

import api from 'lib/api';
import { LoginParamsType, SingupParamsType } from 'types/uesrs';

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation(
    ({ passwordConfirm, ...rest }: SingupParamsType) =>
      api.post(`/auth/signup`, rest),
  );

  return { signup, isLoading };
};

export const useLogin = () => {
  const { mutate: login, isLoading } = useMutation(
    (params: LoginParamsType) => api.post(`/auth/login`, params),
    {
      onSuccess: (res) => {
        const { accessToken, refreshToken } = res.data.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('refreshToken', refreshToken);
      },
    },
  );

  return { login, isLoading };
};
