import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { FormItem } from 'components/ui/FormItem/FormItem';
import { Input } from 'components/ui/Input/Input';
import { SingupParamsType } from 'types/uesr';
import {
  nicknamePattern,
  NICKNAME_FORMAT,
  REQUIRED_FIELD,
} from 'constant/validate';

const Container = styled.div`
  margin-top: 28px;
`;

const PersonalInfoStep = ({
  name,
  phone,
  nickname,
  onChangeSignupParams,
}: {
  name: string;
  phone: string;
  nickname: string;
  onChangeSignupParams: Dispatch<SetStateAction<SingupParamsType>>;
}) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SingupParamsType>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (name && phone && nickname) {
      setValue('name', name);
      setValue('phone', phone);
      setValue('nickname', nickname);
    }
  }, [setValue, name, phone, nickname]);

  const nameWatch = watch('name');
  const phoneWatch = watch('phone');
  const nicknameWatch = watch('nickname');

  useEffect(() => {
    onChangeSignupParams((signupParams) => ({
      ...signupParams,
      name: nameWatch,
      phone: phoneWatch,
      nickname: nicknameWatch,
    }));
  }, [nameWatch, phoneWatch, nicknameWatch, onChangeSignupParams]);

  return (
    <Container>
      <FormItem
        label="이름"
        formName="name"
        {...register('name', {
          required: REQUIRED_FIELD,
        })}
        error={errors['name']}
      >
        <Input placeholder="김보드" />
      </FormItem>
      <FormItem
        formName="phone"
        label="휴대폰 번호"
        {...register('phone', {
          required: REQUIRED_FIELD,
        })}
        error={errors['phone']}
      >
        <Input placeholder="010-0000-0000" />
      </FormItem>
      <FormItem
        formName="nickname"
        label="닉네임"
        {...register('nickname', {
          required: REQUIRED_FIELD,
          validate: (nickname) =>
            nicknamePattern.test(nickname) || NICKNAME_FORMAT,
        })}
        error={errors['nickname']}
      >
        <Input placeholder="보드게임왕" />
      </FormItem>
    </Container>
  );
};

export default PersonalInfoStep;
