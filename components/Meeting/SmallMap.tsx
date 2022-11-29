import styled from 'styled-components';
import { useEffect } from 'react';
import { MeetingProps } from 'types/meeting';

interface MapProps {
  latitude?: number;
  longitude?: number;
  cafeImg: string | null;
  cafeName: string;
  cafeAddress: string;
}

function SmallMap({ latitude, longitude, cafeImg, cafeName, cafeAddress }: MapProps) {
  useEffect(() => {
    const mapScript = document.createElement('script');

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(latitude, longitude),
        };
        const map = new window.kakao.maps.Map(container, options);
        const markerPosition = new window.kakao.maps.LatLng(
          latitude,
          longitude,
        );
        const nowMarker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        nowMarker.setMap(map);
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude]);

  return (
    <MapContainer id="map">
      <MapInfoWrapper>
        <ImgWrapper>
          <Img src={`${cafeImg === null ? `/image.png` : cafeImg}`}/>
        </ImgWrapper>
        <div>
          <div>{cafeName}</div>
          <Location>{cafeAddress}</Location>
        </div>
      </MapInfoWrapper>
    </MapContainer>
  );
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
`;

const MapInfoWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 76px;
  z-index: 3;
  bottom: 0px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #ffffff;
`;

const ImgWrapper = styled.div`
  margin-right: 20px;
`

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`

const Location = styled.div`
  font-size: 10px;
  margin-top: 6px;
`

export default SmallMap;