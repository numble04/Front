import { useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Header from 'components/ui/Header';
import Button from 'components/Button';
import Label from 'components/ui/Label';
import Textarea from 'components/ui/Textarea';
import Dropdown from 'components/ui/Dropdown';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

const HeaderButton = styled(Button)`
  color: #7b2ef0;
  font-size: 14px;
  height: 30px;
  padding: 0 20px;
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
  color: #3a3a3a; //
`;

const FileUploadBox = styled.div`
  display: flex;
  height: 75px;
  margin: 23px 0 16px;
`;

const FileLabel = styled(Label)`
  display: block;
  min-width: 68px;
  margin-right: 30px;
  height: 100%;
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
`;

const FileInput = styled.input`
  display: none;
  width: 68px;
  height: 68px;
`;

const PreviewBox = styled.div`
  display: flex;
  overflow-x: auto;
  img {
    :not(:last-child) {
      margin-right: 10px;
    }
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
`;

const InfoText = styled.p`
  font-size: 12px;
  color: #aaaaaa;
`;

const Page: NextPage = () => {
  const categoryList = ['자유게시판', '정모 후기', '지역별 행사 정보'];
  const [category, setCategory] = useState<string>('자유게시판');
  const [previews, setPreviews] = useState<string[]>([]);
  const [image, setImage] = useState<object[]>([]);

  const router = useRouter();

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nowSelectImageList = e.target.files;
    const nowImageList = [...previews];

    for (let i = 0; i < nowSelectImageList.length; i++) {
      const nowImgUrl = URL.createObjectURL(nowSelectImageList![i]);
      nowImageList.push(nowImgUrl);
    }

    setPreviews(nowImageList);
    setImage([...image, e.target.files[0]]);
  };

  return (
    <CreateBoardStyled>
      <Header isBorder={true}>
        <Image
          src="/icons/back.svg"
          alt="back"
          width={11}
          height={20}
          onClick={() => router.push('/community')}
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
        selectOption={category}
        setCategory={setCategory}
      />
      <FileTextarea />
      <InfoText>
        게시글에 지역명을 적으면 게시글이 자주 노출될 수 있어요.
      </InfoText>
    </CreateBoardStyled>
  );
};

export default Page;
