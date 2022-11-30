import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { AreaFilterProps } from 'types/meeting';
import { BackIcon } from 'components/UI/atoms/Icon';
import { Input } from 'components/UI/Input/Input';
import { Typography } from 'components/UI/Typography/Typography';
import { Flex } from 'components/UI/Flex/Flex';
import Image from 'next/image';

import useGeolocation from 'hooks/local';
import { useLocalInfos, useSearchAddress } from 'hooks/local';
import { getCityName, getDongName } from 'lib/local';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  height: 100vh;
  max-width: 32rem;
  background-color: #FFFFFF;
  z-index: 1000;
`;

const AreaFilter = ({ isOpen, setIsOpen, setArea }: AreaFilterProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const el = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState('');
  const [searchedValue, setSearchedValue] = useState('');
  const location = useGeolocation();
  const { lat, lng } = location.coordinates || {};

  const { localInfos, isLoading } = useLocalInfos({
    enabled: location.loaded && location.coordinates !== undefined,
    lng,
    lat,
  });
  const { searchedLocalInfos } = useSearchAddress(searchedValue);

  const handleSearch = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSearchedValue(searchValue);
    }
  };

  // HINT: 모달 오버레이에서 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      document.body.style.cssText = `
        position: fixed; 
        // top: -${window.scrollY}px;
        // overflow-y: scroll;
        width: 100%;
      `;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const modalContent = isOpen ? (
    <ModalOverlay ref={el}>
      <AreaSearchWrapper gap={4} align="center">
        <Image
          src="/icons/back.svg"
          alt="back"
          width={24}
          height={24}
          onClick={() => setIsOpen(false)}
        />
        <Input
          placeholder="동 이름 또는 지하철역명 입력"
          cssStyle={{ flex: 1 }}
          onKeyDown={handleSearch}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
        />
      </AreaSearchWrapper>
      <AreaSearchResultWrapper>
        {searchedLocalInfos ? (
          <>
            {searchedLocalInfos.length > 0 ? (
              searchedLocalInfos.map((item) => (
                <div
                  style={{
                    padding: '16px 0 12px',
                    borderBottom: '1px solid #f4f4f4',
                    cursor: 'pointer',
                  }}
                  key={item.address_name}
                  onClick={() => {
                    setArea(() => ({
                      city: getCityName(item) === '서울' ? '서울특별시' : getCityName(item),
                      dong: getDongName(item),
                      x: parseFloat(item.x),
                      y: parseFloat(item.y),
                    }));
                    setIsOpen(false);
                  }}
                >
                  <Typography.Text type="b2" regular>
                    {item.address_name}
                  </Typography.Text>
                </div>
              ))
            ) : (
              <Typography.Text
                type="b2"
                regular
                style={{
                  padding: '16px 0 12px',
                }}
              >
                검색 결과가 없습니다.
              </Typography.Text>
            )}
          </>
        ) : (
          <>
            <Typography.Text
              type="b2"
              regular
              style={{
                borderBottom: '1px solid #f4f4f4',
                padding: '16px 0 12px',
              }}
            >
              근처 동네
            </Typography.Text>
            {(!location.loaded || isLoading) && (
              <div
                style={{
                  padding: '16px 0 12px',
                }}
              >
                <Typography.Text type="b2" regular>
                  지역 정보를 받아오는 중입니다...
                </Typography.Text>
              </div>
            )}
            {localInfos.length > 0 &&
              localInfos.map((item) => (
                <div
                  style={{
                    padding: '16px 0 12px',
                    borderBottom: '1px solid #f4f4f4',
                    cursor: 'pointer',
                  }}
                  key={item.code}
                  onClick={() => {
                    console.log(item);
                    setArea(() => ({
                      city: item.region_1depth_name === '서울' ? '서울특별시' : item.region_2depth_name,
                      dong: item.region_3depth_name,
                      x: item.x,
                      y: item.y,
                    }));
                    setIsOpen(false);
                  }}
                >
                  <Typography.Text type="b2" regular>
                    {item.address_name}
                  </Typography.Text>
                </div>
              ))}
          </>
        )}
      </AreaSearchResultWrapper>
    </ModalOverlay>
  ) : null;

  if (isBrowser) {
    const modalRootElement = document.getElementById('modal-root');
    if (modalRootElement) {
      return createPortal(modalContent, modalRootElement);
    }
  }

  return null;
};

const AreaSearchWrapper = styled(Flex)`
  padding: 16px 20px;
  border-bottom: 1px solid #e4e4e4;
`;

const AreaSearchResultWrapper = styled.div`
  padding: 16px 20px;
`;

export default AreaFilter;
