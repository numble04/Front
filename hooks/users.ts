import { useMutation } from 'react-query';

import api from 'lib/api';
import { LoginParamsType, SingupParamsType } from 'types/uesrs';

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation(
    ({ passwordConfirm, ...rest }: SingupParamsType) =>
      api.post(`/users/signup`, rest),
  );

  return { signup, isLoading };
};

export const useLogin = () => {
  const { mutate: login, isLoading } = useMutation((params: LoginParamsType) =>
    api.post(`/users/login`, params),
  );

  return { login, isLoading };
};
