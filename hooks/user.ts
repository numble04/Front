import { useMutation, useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import api from 'lib/api';
import { LoginParamsType, SingupParamsType, UserType } from 'types/uesr';
import { userState } from 'recoil/user';

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation(
    ({ passwordConfirm, ...rest }: SingupParamsType) =>
      api.post(`/auth/signup`, {
        ...rest,
        region: rest.region.replace('서울특별시', '서울'),
        city: rest.city.replace('서울특별시', '서울'),
      }),
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

export const useLogout = () => {
  const setUserState = useSetRecoilState(userState);

  // const { mutate: logout } = useMutation(
  //   (refreshToken: string | null) =>
  //     api.post(`/users/logout`, undefined, {
  //       headers: {
  //         refreshToken: refreshToken || false,
  //       },
  //     }),
  //   {
  //     onSuccess: () => {
  //       localStorage.clear();
  //       delete api.defaults.headers.common['Authorization'];
  //       setUserState(null);
  //     },
  //   },
  // );

  const logout = (refreshToken: string | null) => {
    localStorage.clear();
    delete api.defaults.headers.common['Authorization'];
    setUserState(null);
  };

  return { logout };
};

export const useReissueToken = () => {
  const setUserState = useSetRecoilState(userState);

  const { mutate: reissueToken } = useMutation(
    (refreshToken: string | null) =>
      api.get<UserType>(`/auth/reissue`, {
        headers: {
          refreshToken: refreshToken || false,
        },
      }),
    {
      onSuccess: ({ data }) => {
        const { accessToken, refreshToken, userResponse } = data.data;

        api.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        localStorage.setItem('refreshToken', refreshToken);
        setUserState(userResponse);
      },
    },
  );

  return { reissueToken };
};

export const useUserDetail = () => {
  const { data: userDetail } = useQuery(
    ['users'],
    () => api.get<any>(`/users`),
    {
      select: (res) => res.data.data,
    },
  );

  return { userDetail };
};
