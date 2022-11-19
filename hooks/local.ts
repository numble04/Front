import axios from 'axios';
import { useQuery } from 'react-query';
import { useState, useEffect } from 'react';

import { LocalInfoItemType, SearchAddressType } from 'types/local';

export interface KakaoAPIResponse<TData> {
  documents: TData;
}

interface locationType {
  loaded: boolean;
  coordinates?: { lat: number; lng: number };
  error?: { code: number; message: string };
}

// 현재 위치 받아오기
const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { lat: 0, lng: 0 },
  });

  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    setLocation({
      loaded: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeolocation;

// 현재 위치 기반 주변 동네 정보 가져오기
export const useLocalInfos = ({
  enabled,
  lng,
  lat,
}: {
  enabled: boolean;
  lng?: number;
  lat?: number;
}) => {
  const { data: localInfos = [], isLoading } = useQuery(
    ['useLocalInfos', lng, lat],
    () =>
      axios.get<KakaoAPIResponse<LocalInfoItemType[]>>(
        'https://dapi.kakao.com/v2/local/geo/coord2regioncode.json',
        {
          headers: {
            authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`,
          },
          params: {
            x: lng,
            y: lat,
          },
        },
      ),
    {
      enabled,
      select: (res) => res.data.documents,
    },
  );

  return { localInfos, isLoading };
};

// 검색을 통한 지역 정보 가져오기
export const useSearchAddress = (query: string) => {
  const { data: searchedLocalInfos, isLoading } = useQuery(
    ['useSearchAddress', query],
    () =>
      axios.get<KakaoAPIResponse<SearchAddressType[]>>(
        'https://dapi.kakao.com/v2/local/search/address.json',
        {
          headers: {
            authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_KEY}`,
          },
          params: {
            query,
          },
        },
      ),
    { enabled: query.length > 0, select: (res) => res.data.documents },
  );

  const filteredLocalInfos = searchedLocalInfos?.filter(
    (item) =>
      (item.address &&
        (item.address.region_3depth_name ||
          item.address.region_3depth_h_name)) ||
      (item.road_address &&
        (item.road_address.region_3depth_name ||
          item.road_address.region_3depth_h_name)),
  );

  return { searchedLocalInfos: filteredLocalInfos, isLoading };
};
