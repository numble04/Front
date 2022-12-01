import { useInfiniteQuery, useMutation, useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

import api from 'lib/api';
import {
  LoginParamsType,
  SingupParamsType,
  UserDetail,
  UserType,
} from 'types/uesr';
import { userState } from 'recoil/user';

export const useSignup = () => {
  const { mutate: signup, isLoading } = useMutation(
    ({
      passwordConfirm,
      emailDuplicate,
      nicknameDuplicate,
      ...rest
    }: SingupParamsType) =>
      api.post(`/auth/signup`, {
        ...rest,
        region:
          rest.region.split(' ')[0] === '서울'
            ? rest.region.replace('서울', '서울특별시')
            : rest.region,
        city:
          rest.city === '서울'
            ? rest.city.replace('서울', '서울특별시')
            : rest.city,
      }),
  );

  return { signup, isLoading };
};

export const useCheckEmailDuplicate = () => {
  const { mutateAsync: checkEmailDuplicate } = useMutation((email: string) =>
    api.get<boolean>(`/auth/email`, {
      params: {
        email,
      },
    }),
  );

  return { checkEmailDuplicate };
};

export const useCheckNicknameDuplicate = () => {
  const { mutateAsync: checkNicknameDuplicate } = useMutation(
    (nickname: string) =>
      api.get<boolean>(`/auth/nickname`, {
        params: {
          nickname,
        },
      }),
  );

  return { checkNicknameDuplicate };
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
    () => api.get<UserDetail>(`/users`),
    {
      select: (res) => res.data.data,
    },
  );

  return { userDetail };
};

export const useUpdateUserInfo = () => {
  const { mutate: updateUserInfo } = useMutation((params: any) =>
    api.put(`/users`, params),
  );

  return { updateUserInfo };
};

export const useWithdrawlUser = () => {
  const { mutate: withdrawlUser } = useMutation((refreshToken: string | null) =>
    api.delete(`/users`, {
      headers: {
        refreshToken: refreshToken || false,
      },
    }),
  );

  return { withdrawlUser };
};

export const useUpdateUserProfile = () => {
  const { mutate: updateUserProfile } = useMutation(() =>
    api.put(`/users/profile`),
  );

  return { updateUserProfile };
};

export const useMyPosts = ({ tab }: { tab: 'community' | 'meeting' }) => {
  const { data: myPosts } = useQuery(
    ['/posts/my', tab],
    () =>
      api.get(`/posts/my`, {
        params: {
          size: 10,
        },
      }),
    {
      select: (res) => res.data.data.content,
      enabled: tab === 'community',
    },
  );

  return { myPosts };
};

export const useMyMeetings = ({ tab }: { tab: 'community' | 'meeting' }) => {
  const { data: myMeetings } = useQuery(
    ['/meetings/my', tab],
    () =>
      api.get(`/meetings/my`, {
        params: {
          size: 10,
        },
      }),
    {
      select: (res) => res.data.data.content,
      enabled: tab === 'meeting',
    },
  );

  return { myMeetings };
};

export const useMyMeetingsLike = ({
  tab,
}: {
  tab: 'meeting' | 'comment' | 'post';
}) => {
  const { data: myMeetingsLike } = useQuery(
    ['/meetings/like', tab],
    () =>
      api.get(`/meetings/like`, {
        params: {
          size: 10,
        },
      }),
    {
      select: (res) => res.data.data.content,
      enabled: tab === 'meeting',
    },
  );

  return { myMeetingsLike };
};

export const useMyComments = ({
  tab,
}: {
  tab: 'meeting' | 'comment' | 'post';
}) => {
  const { data: myComments } = useQuery(
    ['/comments/my', tab],
    () =>
      api.get(`/comments/my`, {
        params: {
          size: 10,
        },
      }),
    {
      select: (res) => res.data.data,
      enabled: tab === 'comment',
    },
  );

  return { myComments };
};

export const useMyPostsLike = ({
  tab,
}: {
  tab: 'meeting' | 'comment' | 'post';
}) => {
  const { data: myPostsLike } = useQuery(
    ['/posts/like', tab],
    () =>
      api.get(`/posts/like`, {
        params: {
          size: 10,
        },
      }),
    {
      select: (res) => res.data.data.content,
      enabled: tab === 'post',
    },
  );

  return { myPostsLike };
};
