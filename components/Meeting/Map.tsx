import styled from 'styled-components';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { MeetingProps } from 'types/meeting';

interface MapProps {
  latitude?: number;
  longitude?: number;
  meetings?: MeetingProps[]
  setMeetingVisible: Dispatch<SetStateAction<boolean>>;
  setMapMeeting: Dispatch<SetStateAction<MeetingProps>>;
}

function Map({ latitude, longitude, meetings, setMeetingVisible, setMapMeeting }: MapProps) {
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
        
        if(meetings === undefined) return;
        const imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        meetings.forEach((meeting) => {
          const imageSize = new window.kakao.maps.Size(24, 35); 
          const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize); 
          const marker = new window.kakao.maps.Marker({
              map: map,
              position: new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude),
              title : meeting.title,
              image : markerImage
          });
          const onClick = () => {
            setMeetingVisible(true);
            setMapMeeting(meeting);
          }
          
          const content = document.createElement("div")
          content.className = 'map-content-wrapper';

          const imgWrapper = document.createElement("div")
          imgWrapper.className = 'map-img-wrapper';
          
          const img = document.createElement("img");
          img.className = 'map-img';
          img.src = meeting.img === null ? `/image.png` : meeting.img;
          img.onclick = onClick;
          
          content.append(
            imgWrapper
          );
          imgWrapper.append(
            img
          );

          const overlay = new window.kakao.maps.CustomOverlay({
            content: content,
            map: map,
            position: new window.kakao.maps.LatLng(meeting.latitude, meeting.longitude),       
          });

          window.kakao.maps.event.addListener(map, 'click', function() {   
            setMeetingVisible(false);
          });
        });
      });
    };
    mapScript.addEventListener('load', onLoadKakaoMap);

    return () => mapScript.removeEventListener('load', onLoadKakaoMap);
  }, [latitude, longitude, meetings]);

  return <MapContainer id="map" />;
}

const MapContainer = styled.div`
  width: 100%;
  height: calc(100vh - 48px);
`;

export default Map;