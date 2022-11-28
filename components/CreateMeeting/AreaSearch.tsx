import styled from 'styled-components';
import {
  ChangeEvent,
  Dispatch,
  Key,
  SetStateAction,
  useState,
} from 'react';
import Image from 'next/image';

import useGeolocation, { useCafeInfos } from 'hooks/local';
import { Typography } from 'components/UI/Typography/Typography';
import { Input } from 'components/UI/Input/Input';
import { useLocalInfos } from 'hooks/local';
import { Flex } from 'components/UI/Flex/Flex';
import { CreateMeetingParamsType } from 'types/uesrs';

const AreaSearchWrapper = styled(Flex)`
  padding: 16px 20px;
  border-bottom: 1px solid #e4e4e4;
`;

const AreaSearchResultWrapper = styled.div`
  padding: 16px 20px;
`;

const AreaSearch = ({
  onChangeIsAreaSearching,
  onChangeCreateMeetingParams,
}: {
  onChangeIsAreaSearching: Dispatch<SetStateAction<boolean>>;
  onChangeCreateMeetingParams: Dispatch<SetStateAction<CreateMeetingParamsType>>;
}) => {
  const [searchValue, setSearchValue] = useState('');
  const location = useGeolocation();
  const { lat, lng } = location.coordinates || {};

  const { localInfos, isLoading } = useLocalInfos({
    enabled: location.loaded && location.coordinates !== undefined,
    lng,
    lat,
  });

  const { searchedCafeInfos } = useCafeInfos(searchValue);

  return (
    <>
      <AreaSearchWrapper gap={4} align="center">
        <Image
          src="/icons/back.svg"
          alt="back"
          width={24}
          height={24}
          onClick={() => onChangeIsAreaSearching(false)}
        />
        <Input
          placeholder="동 이름 또는 지하철역명 입력"
          cssStyle={{ flex: 1 }}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchValue(e.target.value)
          }
          value={searchValue}
        />
      </AreaSearchWrapper>
      <AreaSearchResultWrapper>
        {searchValue !== '' ? (
          <>
            {searchedCafeInfos && searchedCafeInfos.length > 0 ? (
              searchedCafeInfos.map((item: { id: any; name: string; }, index: Key) => (
                <div
                  style={{
                    padding: '16px 0 12px',
                    borderBottom: '1px solid #f4f4f4',
                    cursor: 'pointer',
                  }}
                  key={index}
                  onClick={() => {
                    onChangeCreateMeetingParams((params) => ({
                      ...params,
                      cafeId: parseInt(item.id),
                      cafeName: item.name,
                    }));
                    onChangeIsAreaSearching(false);
                  }}
                >
                  <Typography.Text type="b2" regular>
                    {item.name}
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
                    setSearchValue(item.address_name)
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
    </>
  );
};

export default AreaSearch;
