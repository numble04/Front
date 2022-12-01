import { Form, Input, message, Upload } from 'antd';
import { RcFile } from 'antd/es/upload';
import { Flex } from 'components/UI/Flex/Flex';
import { Typography } from 'components/UI/Typography/Typography';
import {
  useLogout,
  useUpdateUserInfo,
  useUpdateUserProfile,
  useUserDetail,
  useWithdrawlUser,
} from 'hooks/user';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { theme } from 'styles/theme';

const Container = styled.div``;

const TitleWrapper = styled.div`
  padding: 15px 20px;
  border-bottom: 1px solid #e4e4e4;
`;

const ProfileSection = styled(Flex)`
  padding: 35px 20px 12px;
`;

const ProfileImageWrapper = styled.div`
  position: relative;
  width: 88px;
  height: 88px;
  img {
    border-radius: 50%;
  }
`;

const PenImageWrapper = styled(Flex)`
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background-color: ${theme.colors.PRIMARY};
  border: 2px solid #fff;
`;

const EditSection = styled.div`
  padding: 0 20px;
`;

const LogoutAndWithdrawlSection = styled(Flex)`
  margin-top: 192px;
  padding-left: 20px;
`;

const MyEdit = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [profileImage, setProfileImage] = useState<RcFile>();
  const refreshToken =
    typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  const { userDetail } = useUserDetail();
  const { updateUserInfo } = useUpdateUserInfo();
  const { withdrawlUser } = useWithdrawlUser();
  const { updateUserProfile } = useUpdateUserProfile();
  const { logout } = useLogout();

  const handleClickBackIcon = () => {
    router.back();
  };

  const handleSubmit = ({
    nickname,
    introduction,
  }: {
    nickname: string;
    introduction: string;
  }) => {
    updateUserInfo(
      {
        nickname,
        name: '',
        phone: '',
        region: '',
        city: '',
        dong: '',
        introduction,
      },
      {
        onSuccess: () => {
          message.success('변경되었습니다.');
          router.back();
        },
      },
    );
  };

  const handleLogout = () => {
    logout(refreshToken);
    router.replace('/');
  };

  const handleWithdrawl = () => {
    withdrawlUser(refreshToken, {
      onSuccess: () => {
        logout(refreshToken);
        router.replace('/');
      },
    });
  };

  return (
    <Container>
      <TitleWrapper>
        <Flex justify="space-between">
          <Image
            src="/icons/back.svg"
            alt="back"
            width={24}
            height={24}
            onClick={handleClickBackIcon}
          />
          <Typography.Text type="h6">프로필 수정</Typography.Text>
          <Typography.Text onClick={form.submit} color="PRIMARY">
            완료
          </Typography.Text>
        </Flex>
      </TitleWrapper>
      <ProfileSection justify={'center'} align="center">
        <ProfileImageWrapper>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={userDetail?.img || '/images/default_profile.png'}
            alt="profile"
            width={88}
            height={88}
          />
          <Upload
            showUploadList={false}
            beforeUpload={async (file) => {
              // updateUserProfile(createFormData(file), {
              //   onSuccess: () => {
              //     message.success('변경되었습니다.');
              //   },
              // });
              return false;
            }}
          >
            <PenImageWrapper
              onClick={() => router.push('/my/edit')}
              justify="center"
              align="center"
            >
              <Image src="/icons/pen.svg" alt="back" width={16} height={16} />
            </PenImageWrapper>
          </Upload>
        </ProfileImageWrapper>
      </ProfileSection>
      <EditSection>
        <Form onFinish={handleSubmit} form={form}>
          <Form.Item label="닉네임" name="nickname">
            <Input placeholder="닉네임을 입력해주세요." />
          </Form.Item>
          <div>별명 및 닉네임 입력 시 서비스 이용이 제한될 수 있습니다.</div>
          <div style={{ marginBottom: 32 }}>
            이름은 14일 안에 한 번만 변경할 수 있습니다.
          </div>
          <Form.Item label="자기소개" name="introduction">
            <Input.TextArea placeholder="내용을 입력해주세요." />
          </Form.Item>
        </Form>
      </EditSection>
      <LogoutAndWithdrawlSection gap={16}>
        <div onClick={handleLogout}>로그아웃</div>
        <div onClick={handleWithdrawl} style={{ color: 'red' }}>
          탈퇴하기
        </div>
      </LogoutAndWithdrawlSection>
    </Container>
  );
};

export default MyEdit;
