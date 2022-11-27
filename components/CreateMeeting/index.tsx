import styled from 'styled-components';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Typography } from 'components/UI/Typography/Typography';
import { Button } from 'components/UI/Button/Button';
import { theme } from 'styles/theme';
import Modal from 'components/UI/Modal';
import { titleInfos } from 'constant/createMeeting';
import { CreateMeetingParamsType } from 'types/uesrs';
import { useSignup } from 'hooks/user';
import TitleStep from './TitleStep';
import ContentStep from './ContentStep';
import DateStep from './DateStep';
import AreaStep from './AreaStep';
import CapacityStep from './CapacityStep';
import CostStep from './CostStep';
import UrlStep from './UrlStep';

const Container = styled.div`
  margin-top: 30px;
  padding: 0 20px;
`;

const ProgressBarBackground = styled.div`
  position: relative;
  height: 4px;
  background-color: ${theme.colors.SURFACE_USES};
`;

const ProgressBar = styled.div<{ createMeetingStep: number }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: ${({ createMeetingStep }) => createMeetingStep * 14.2857}%;
  background-color: ${theme.colors.PRIMARY};
  transition: width 0.5s ease-in-out;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 20px;
  border-top: 1px solid #e2e4e8;
`;

const CreateMeeting = () => {
  const router = useRouter();
  const [isAreaSearching, setIsAreaSearching] = useState(false);
  const [createMeetingStep, setCreateMeetingStep] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [createMeetingParams, setCreateMeetingParams] =
    useState<CreateMeetingParamsType>({
      title: '',
      content: '',
      file: '',
      day: null,
      cafeId: '',
      capacity: 3,
      cost: '',
      time: '',
      kakaoUrl: '',
    });

  const { signup, isLoading: signupLoading } = useSignup();

  const isNextButtonActive = useMemo(() => {
    if (createMeetingStep === 1 && createMeetingParams.title) {
      return true;
    }
    if (createMeetingStep === 2 && createMeetingParams.content) {
      return true;
    }
    if (createMeetingStep === 3 && createMeetingParams.day) {
      return true;
    }
    if (createMeetingStep === 4 && createMeetingParams.cafeId) {
      return true;
    }
    if (createMeetingStep === 5 && createMeetingParams.capacity) {
      return true;
    }
    if (
      createMeetingStep === 6 &&
      createMeetingParams.cost &&
      createMeetingParams.time
    ) {
      return true;
    }
    if (createMeetingStep === 7 && createMeetingParams.kakaoUrl) {
      return true;
    }

    return false;
  }, [createMeetingStep, createMeetingParams]);

  const renderCreateMeetingStep = () => {
    switch (createMeetingStep) {
      case 1:
        return (
          <TitleStep
            title={createMeetingParams.title}
            onChangeCreateMeetingParams={setCreateMeetingParams}
          />
        );
      case 2:
        return (
          <ContentStep
            content={createMeetingParams.content}
            onChangeCreateMeetingParams={setCreateMeetingParams}
          />
        );
      case 3:
        return (
          <DateStep
            date={createMeetingParams.day}
            onChangeCreateMeetingParams={setCreateMeetingParams}
          />
        );
      case 4:
        return (
          <AreaStep
            cafeId={createMeetingParams.cafeId}
            onChangeCreateMeetingParams={setCreateMeetingParams}
          />
        );
      case 5:
        return (
          <CapacityStep
            capacity={createMeetingParams.capacity}
            onChangeCreateMeetingParams={setCreateMeetingParams}
          />
        );
      case 6:
        return (
          <CostStep
            cost={createMeetingParams.cost}
            time={createMeetingParams.time}
            onChangeCreateMeetingParams={setCreateMeetingParams}
          />
        );
      case 7:
        return (
          <UrlStep
            kakaoUrl={createMeetingParams.kakaoUrl}
            onChangeCreateMeetingParams={setCreateMeetingParams}
          />
        );
      default:
        return null;
    }
  };

  const handleClickBackIcon = () => {
    if (createMeetingStep === 1) {
      return setModalVisible(true);
    }
    setCreateMeetingStep((createMeetingStep) => createMeetingStep - 1);
  };

  const handleClickNextButton = () => {
    if (createMeetingStep >= 1 && createMeetingStep < 7) {
      setCreateMeetingStep((createMeetingStep) => createMeetingStep + 1);
      console.log(createMeetingParams);
    } else if (createMeetingStep === 7) {
      console.log(createMeetingParams);
    }
  };

  if (isAreaSearching) {
    return <div>areaSearching</div>;
  }

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        onOK={() => router.push('/meeting')}
        type={'back'}
      />
      <ProgressBarBackground>
        <ProgressBar createMeetingStep={createMeetingStep} />
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
          {titleInfos[createMeetingStep - 1].title}
        </Typography.Text>
        <Typography.Text type="b2" color="SLATEGRAY50" gutter={{ top: 8 }}>
          {titleInfos[createMeetingStep - 1].description}
        </Typography.Text>
        {renderCreateMeetingStep()}
        <Footer>
          <Button
            full
            isActive={isNextButtonActive}
            loading={signupLoading}
            onClick={handleClickNextButton}
          >
            {createMeetingStep === 7 ? '생성하기' : '다음'}
          </Button>
        </Footer>
      </Container>
    </>
  );
};

export default CreateMeeting;