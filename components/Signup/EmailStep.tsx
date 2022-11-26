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
import { useCheckEmailDuplicate } from 'hooks/user';

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
    setValue,
    formState: { errors },
  } = useForm<SingupParamsType>({
    mode: 'onChange',
  });

  const { checkEmailDuplicate } = useCheckEmailDuplicate();

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [setValue, email]);

  return (
    <Container>
      <form>
        <FormItem
          formName="email"
          {...register('email', {
            required: REQUIRED_FIELD,
            validate: async (email) => {
              if (emailPattern.test(email)) {
                try {
                  const res = await checkEmailDuplicate(email);

                  if (res.status === 200) {
                    onChangeSignupParams((signupParams) => ({
                      ...signupParams,
                      email,
                      emailDuplicate: false,
                    }));
                    return true;
                  }
                } catch (e) {
                  console.log(e);
                  onChangeSignupParams((signupParams) => ({
                    ...signupParams,
                    email,
                    emailDuplicate: true,
                  }));
                  return '중복된 이메일입니다.';
                }
              }

              return NOT_VALID_FORMAT;
            },
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
