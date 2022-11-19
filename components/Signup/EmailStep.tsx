import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect } from 'react';

import { FormItem } from 'components/ui/FormItem/FormItem';
import { Input } from 'components/ui/Input/Input';
import { SingupParamsType } from 'types/uesr';
import {
  emailPattern,
  NOT_VALID_FORMAT,
  REQUIRED_FIELD,
} from 'constant/validate';

const Container = styled.div`
  margin-top: 28px;
`;

const EmailStep = ({
  email,
  onChangeSignupParams,
}: {
  email: string;
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
    if (email) {
      setValue('email', email);
    }
  }, [setValue, email]);

  const emailWatch = watch('email');

  useEffect(() => {
    onChangeSignupParams((signupParams) => ({
      ...signupParams,
      email: emailWatch,
    }));
  }, [emailWatch, onChangeSignupParams]);

  return (
    <Container>
      <form>
        <FormItem
          formName="email"
          {...register('email', {
            required: REQUIRED_FIELD,
            validate: (email) => emailPattern.test(email) || NOT_VALID_FORMAT,
          })}
          error={errors['email']}
        >
          <Input placeholder="example@boardgame.kr" />
        </FormItem>
      </form>
    </Container>
  );
};

export default EmailStep;
