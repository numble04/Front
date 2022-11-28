import { atom, selector } from 'recoil';
import { UserResponseType } from 'types/uesr';

export const userState = atom<UserResponseType | null>({
  key: 'userState',
  default: null,
});

export const isLoggedInState = selector({
  key: 'isLoggedInState',
  get: ({ get }) => get(userState) !== null,
});
