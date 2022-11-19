import styled from 'styled-components';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Typography } from 'components/ui/Typography/Typography';
import { Button } from 'components/ui/Button/Button';
import { theme } from 'styles/theme';
import Modal from 'components/ui/Modal';
import { titleInfos } from 'constant/user';
import { SingupParamsType } from 'types/uesr';
import CurrentAreaStep from './CurrentAreaStep';
import AreaSearch from './AreaSearch';
import EmailStep from './EmailStep';
import PasswordStep from './PasswordStep';
import PersonalInfoStep from './PersonalInfoStep';
import { emailPattern, passwordPattern } from 'constant/validate';
import { useSignup } from 'hooks/user';

const Container = styled.div`
  margin-top: 30px;
  padding: 0 20px;
`;

const ProgressBarBackground = styled.div`
  position: relative;
  height: 4px;
  background-color: ${theme.colors.SURFACE_USES};
`;

const ProgressBar = styled.div<{ signupStep: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: ${({ signupStep }) => signupStep * 20}%;
  background-color: ${theme.colors.PRIMARY};
  transition: width 0.5s ease-in-out;
`;

const Footer = styled.div`
  position: relative;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 20px;
  border-top: 1px solid #e2e4e8;
`;

const Signup = () => {
  const router = useRouter();
  const [isAreaSearching, setIsAreaSearching] = useState(false);
  const [signupStep, setSignupStep] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [signupParams, setSignupParams] = useState<SingupParamsType>({
    email: '',
    name: '',
    nickname: '',
    phone: '',
    password: '',
    passwordConfirm: '',
    region: '',
    city: '',
    dong: '',
  });

  const { signup, isLoading: signupLoading } = useSignup();

  const isNextButtonActive = useMemo(() => {
    if (signupStep === 1 && signupParams.region) {
      return true;
    }
    if (signupStep === 2 && emailPattern.test(signupParams.email)) {
      return true;
    }
    if (
      signupStep === 3 &&
      passwordPattern.test(signupParams.password) &&
      signupParams.password === signupParams.passwordConfirm
    ) {
      return true;
    }
    if (
      signupStep === 4 &&
      signupParams.phone &&
      signupParams.nickname &&
      signupParams.name
    ) {
      return true;
    }

    return false;
  }, [signupStep, signupParams]);

  const renderSignupStep = () => {
    switch (signupStep) {
      case 1:
        return (
          <CurrentAreaStep
            region={signupParams.region}
            onChangeIsAreaSearching={setIsAreaSearching}
          />
        );
      case 2:
        return (
          <EmailStep
            email={signupParams.email}
            onChangeSignupParams={setSignupParams}
          />
        );
      case 3:
        return (
          <PasswordStep
            password={signupParams.password}
            passwordConfirm={signupParams.passwordConfirm}
            onChangeSignupParams={setSignupParams}
          />
        );
      case 4:
        return (
          <PersonalInfoStep
            name={signupParams.name}
            phone={signupParams.phone}
            nickname={signupParams.nickname}
            onChangeSignupParams={setSignupParams}
          />
        );
      case 5:
        return <></>;
      default:
        return (
          <CurrentAreaStep
            region={signupParams.region}
            onChangeIsAreaSearching={setIsAreaSearching}
          />
        );
    }
  };

  const handleClickBackIcon = () => {
    if (signupStep === 1) {
      return setModalVisible(true);
    }
    setSignupStep((signupStep) => signupStep - 1);
  };

  const handleClickNextButton = () => {
    if (signupStep >= 1 && signupStep < 4) {
      setSignupStep((signupStep) => signupStep + 1);
    } else if (signupStep === 4) {
      signup(signupParams, {
        onSuccess: () => {
          alert('회원가입이 완료되었습니다.');
          router.push('/login');
        },
      });
    }
  };

  if (isAreaSearching) {
    return (
      <AreaSearch
        onChangeIsAreaSearching={setIsAreaSearching}
        onChangeSignupParams={setSignupParams}
      />
    );
  }

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        onOK={() => router.push('/')}
      >
        <div>회원가입을 종료하시겠습니까?</div>
      </Modal>
      <ProgressBarBackground>
        <ProgressBar signupStep={signupStep} />
      </ProgressBarBackground>
      <Container>
        <Image
          src="/icons/back.svg"
          alt="back"
          width={24}
          height={24}
          onClick={handleClickBackIcon}
        />
        <Typography.Text type="h6" gutter={{ top: 36 }}>
          {titleInfos[signupStep - 1].title}
        </Typography.Text>
        <Typography.Text type="b2" color="SLATEGRAY50" gutter={{ top: 8 }}>
          {titleInfos[signupStep - 1].description}
        </Typography.Text>
        {renderSignupStep()}
        <Footer>
          <Button
            full
            isActive={isNextButtonActive}
            loading={signupLoading}
            onClick={handleClickNextButton}
          >
            {signupStep === 4 ? '가입하기' : '다음'}
          </Button>
        </Footer>
      </Container>
    </>
  );
};

export default Signup;
