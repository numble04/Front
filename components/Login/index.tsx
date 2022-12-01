import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { css } from 'styled-components';

import { Button } from 'components/UI/Button/Button';
import { FormItem } from 'components/UI/FormItem/FormItem';
import { Input } from 'components/UI/Input/Input';
import { Typography } from 'components/UI/Typography/Typography';
import { theme } from 'styles/theme';
import { useLogin } from 'hooks/user';
import { LoginParamsType } from 'types/uesr';
import { Flex } from 'components/UI/Flex/Flex';
import { message } from 'antd';

const Login = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParamsType>({
    mode: 'onChange',
  });

  const { login, isLoading } = useLogin();

  const submitHandler = (formValues: LoginParamsType) => {
    login(formValues, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  const handleClickSignup = () => {
    router.push('/signup');
  };

  return (
    <div>
      <Image
        src="/icons/back.svg"
        alt="back"
        width={24}
        height={24}
        onClick={() => router.push('/')}
      />
      <Typography.Text
        bold
        type="h6"
        gutter={{ top: 36, bottom: 36 }}
        color="SLATEGRAY80"
      >
        로그인
      </Typography.Text>
      <form onSubmit={handleSubmit(submitHandler)}>
        <FormItem
          label="이메일"
          formName="email"
          {...register('email', {
            required: '필수 항목',
          })}
          error={errors['email']}
        >
          <Input placeholder="이메일" />
        </FormItem>
        <FormItem
          label="비밀번호"
          formName="password"
          {...register('password', {
            required: '필수 항목',
            deps: ['passwordConfirm'],
          })}
        >
          <Input placeholder="비밀번호" type="password" />
        </FormItem>
        <Typography.Text type="b2" color="ERROR" gutter={{ bottom: 8 }}>
          {errors['password']?.message}
        </Typography.Text>
        <Button
          full
          type="submit"
          size="h48"
          variant="fill"
          loading={isLoading}
          css={css`
            margin: 16px 0;
          `}
        >
          로그인
        </Button>
      </form>
      <Flex justify="center">
        <Typography.Text type="b2" color="SLATEGRAY70">
          아이디가 없나요?{' '}
          <Typography.Text
            inline
            style={{ color: '#283bf1' }}
            underline
            type="b2"
            onClick={handleClickSignup}
          >
            회원가입
          </Typography.Text>
        </Typography.Text>
      </Flex>
    </div>
  );
};

export default Login;
