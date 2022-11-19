import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { FormItem } from 'components/ui/FormItem/FormItem';
import { Input } from 'components/ui/Input/Input';
import { SingupParamsType } from 'types/uesr';
import {
  passwordPattern,
  PASSWORD_FORMAT,
  PASSWORD_NOT_SAME,
  REQUIRED_FIELD,
} from 'constant/validate';

const Container = styled.div`
  margin-top: 28px;
`;

const PasswordStep = ({
  password,
  passwordConfirm,
  onChangeSignupParams,
}: {
  password: string;
  passwordConfirm: string;
  onChangeSignupParams: Dispatch<SetStateAction<SingupParamsType>>;
}) => {
  const {
    register,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<SingupParamsType>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (password && passwordConfirm) {
      setValue('password', password);
      setValue('passwordConfirm', passwordConfirm);
    }
  }, [setValue, password, passwordConfirm]);

  const passwordWatch = watch('password');
  const passwordConfirmWatch = watch('passwordConfirm');

  useEffect(() => {
    onChangeSignupParams((signupParams) => ({
      ...signupParams,
      password: passwordWatch,
      passwordConfirm: passwordConfirmWatch,
    }));
  }, [passwordWatch, passwordConfirmWatch, onChangeSignupParams]);

  return (
    <Container>
      <FormItem
        label="비밀번호"
        formName="password"
        {...register('password', {
          required: REQUIRED_FIELD,
          validate: (password) =>
            passwordPattern.test(password) || PASSWORD_FORMAT,
          deps: ['passwordConfirm'],
        })}
        error={errors['password']}
      >
        <Input placeholder="비밀번호를 입력해주세요" type="password" />
      </FormItem>
      <FormItem
        formName="passwordConfirm"
        label="비밀번호 확인하기"
        {...register('passwordConfirm', {
          required: REQUIRED_FIELD,
          validate: (currentPassword) => {
            return (
              currentPassword === getValues('password') || PASSWORD_NOT_SAME
            );
          },
        })}
        error={errors['passwordConfirm']}
      >
        <Input
          placeholder="비밀번호를 한 번 더 입력해 주세요"
          type="password"
        />
      </FormItem>
    </Container>
  );
};

export default PasswordStep;
