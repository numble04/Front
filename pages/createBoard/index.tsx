import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import api from 'lib/api';
import Image from 'next/image';
import Header from 'components/UI/Header';
import Button from 'components/Button';
import Label from 'components/UI/Label';
import Textarea from 'components/UI/Textarea';
import Dropdown from 'components/UI/Dropdown';

const HeaderButton = styled(Button)`
  color: #7b2ef0;
  font-size: 14px;
  height: 30px;
  padding: 0 20px;
`;

const RegisterForm = styled.form`
  .backIcon {
    cursor: pointer;
  }
`;

const CreateBoardStyled = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #ffffff;
`;

const HeaderTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #3a3a3a;
`;

const FileUploadBox = styled.div`
  display: flex;
  height: 75px;
  margin: 23px 0 16px;
`;

const FileLabel = styled(Label)`
  display: block;
  min-width: 68px;
  margin-right: 8px;
  height: 68px;
  font-size: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  cursor: pointer;
`;

const LabelText = styled.p`
  font-size: 12px;
  color: #aaaaaa;
`;

const FileInput = styled.input`
  display: none;
  width: 68px;
  height: 68px;
`;

const PreviewBox = styled.div`
  display: flex;
  overflow-x: auto;
  img:not(:last-child) {
    margin-right: 8px;
  }
`;

const PreviewImage = styled.img`
  width: 68px;
  height: 68px;
`;

const FileTextarea = styled(Textarea)`
  width: 100%;
  height: 220px;
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  :focus {
    outline: 1px solid #e5e0e0;
  }
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #aaaaaa;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 8px;
  padding: 0px 20px;
  border: 1px solid #d9d9d9;
  margin-bottom: 38px;

  :focus {
    outline: 1px solid #e5e0e0;
  }
`;

const TitleText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #3a3a3a;
  margin: 16px 0 8px;
`;

const ContentText = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: #3a3a3a;
  margin-bottom: 8px;
`;

export type menuType = { name: string; type: string };

const Page: NextPage = () => {
  const categoryList = [
    { name: '자유게시판', type: 'FREE' },
    { name: '정모 후기', type: 'MEET_REVIEW' },
    { name: '지역별 행사 정보', type: 'EVENT' },
  ];
  const [category, setCategory] = useState<menuType>({
    name: '자유게시판',
    type: 'FREE',
  });
  const [previews, setPreviews] = useState<string[]>([]);
  const [image, setImage] = useState<(string | Blob)[]>([]);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const [isMenu, setIsMenu] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'title') {
      setTitle(value);
    } else {
      setContent(value);
    }
  };

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowSelectImageList = e.target.files;
    const nowImageList = [...previews];

    if (!nowSelectImageList) {
      alert('이미지가 없습니다.');
      return;
    }

    for (let i = 0; i < nowSelectImageList.length; i++) {
      const nowImgUrl = URL.createObjectURL(nowSelectImageList![i]);
      nowImageList.push(nowImgUrl);
    }

    setPreviews(nowImageList);
    setImage([...image, nowSelectImageList[0]]);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let formData = new FormData();

    // formData.append('files', new Blob([image]));

    image.forEach((image, index) => {
      formData.append(`files`, image);
    });

    formData.append(
      'postRequest',
      new Blob(
        [
          JSON.stringify({
            title: title,
            content,
            type: category.type,
          }),
        ],
        { type: 'application/json' },
      ),
    );

    // 아래 게시글등록 로직 수정 필요
    try {
      const response = await api.post('/posts', formData);
      if (response.status === 200 || 201) {
        alert('상품등록 성공');
        console.log('상품등록 성공');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <CreateBoardStyled>
      <RegisterForm onSubmit={onSubmit}>
        <Header isBorder={true}>
          <Image
            className="backIcon"
            src="/icons/back.svg"
            alt="back"
            width={21}
            height={20}
            onClick={() => router.back()}
          />

          <HeaderTitle>게시글 수정</HeaderTitle>
          <HeaderButton>올리기</HeaderButton>
        </Header>
        <FileUploadBox>
          <FileLabel>
            <LabelText>{image.length}/5</LabelText>
            <FileInput
              type="file"
              accept="image/*"
              onChange={handleUploadImage}
            />
          </FileLabel>
          <PreviewBox>
            {!!previews.length &&
              previews.map((img, index) => (
                <PreviewImage
                  src={img}
                  alt="preview-img"
                  key={`preview-image-${index + 1}`}
                />
              ))}
          </PreviewBox>
        </FileUploadBox>
        <Dropdown
          menuList={categoryList}
          selectOption={category.name}
          setCategory={setCategory}
          isMenu={isMenu}
          setIsMenu={setIsMenu}
        />
        <TitleText>제목</TitleText>
        <TitleInput
          name="title"
          placeholder="지역명이 들어간 제목을 입력해주세요."
          onChange={handleChange}
        />
        <ContentText>내용</ContentText>
        <FileTextarea
          name="content"
          placeholder="오늘 어떤 것을 보고, 느끼고, 생각하셨나요?"
          onChange={handleChange}
        />
        <InfoText>
          게시글에 지역명을 적으면 게시글이 자주 노출될 수 있어요.
        </InfoText>
      </RegisterForm>
    </CreateBoardStyled>
  );
};

export default Page;
