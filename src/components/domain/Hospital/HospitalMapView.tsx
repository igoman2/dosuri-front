import styled from "@emotion/styled";
import { FC, useEffect } from "react";

interface HospitalMapProps {
  latitude: number;
  longitude: number;
}

const HospitalMapView: FC<HospitalMapProps> = ({ latitude, longitude }) => {
  const coordinates = [latitude, longitude];
  useEffect(() => {
    const mapScript = document.createElement("script");

    mapScript.async = true;
    mapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`;

    document.head.appendChild(mapScript);

    const onLoadKakaoMap = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        if (!mapContainer) {
          return;
        }

        const initialCenter = new window.kakao.maps.LatLng(latitude, longitude);

        const mapOption = {
          center: initialCenter,
          level: 3, // 지도의 확대 레벨
        };

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: initialCenter,
        });

        // markersRef.current.push(marker);
        const hospitalMap = new window.kakao.maps.Map(mapContainer, mapOption);
        marker.setMap(hospitalMap);
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, [coordinates]);

  return <HospitalMapWrapper id="map" />;
};

export default HospitalMapView;

const HospitalMapWrapper = styled.div`
  height: 15rem;
  width: 100%;
`;
