import styled from "@emotion/styled";
import { FC, useEffect } from "react";
import { getLocationByCoordinate } from "@/service/apis/location";
import { KakaoMapViewLocation } from "@/types/service";
import { Location } from "@/types/location";
import { useRecoilState } from "recoil";
import { locationState } from "../domain/Address/store";
import { 강남구청 } from "@/constants/Location";

declare global {
  interface Window {
    kakao: any;
  }
}

interface IMapProps {
  locationInfo: KakaoMapViewLocation;
  setLocationInfo: (value: KakaoMapViewLocation) => void;
  coordinates: Location;
  loaded: boolean;
}

const KakaoMap: FC<IMapProps> = ({ coordinates, setLocationInfo, loaded }) => {
  const [location, setLocation] = useRecoilState(locationState);

  const getInitialCenter = () => {
    if (!loaded) {
      return 강남구청;
    }
    if (location.longitude === 0 && location.latitude === 0) {
      return {
        latitude: coordinates!.latitude,
        longitude: coordinates!.longitude,
      };
    } else {
      return {
        latitude: location!.latitude,
        longitude: location!.longitude,
      };
    }
  };
  // 중심 좌표가 바뀔 때마다 주소를 가져온다.
  useEffect(() => {
    const { latitude, longitude } = getInitialCenter();

    const fetchLocation = async () => {
      const data = await getLocationByCoordinate({
        longitude: longitude,
        latitude: latitude,
      });
      setLocationInfo({
        address: data.documents[0].address,
        road_address: data.documents[0].road_address,
        latitude,
        longitude,
      });
      return data.documents;
    };
    fetchLocation();
  }, [location]);

  // 카카오맵 이니셜라이징 및 마커 이벤트 등록
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

        const { latitude, longitude } = getInitialCenter();
        const initialCenter = new window.kakao.maps.LatLng(latitude, longitude);

        const mapOption = {
          center: initialCenter,
          level: 3, // 지도의 확대 레벨
        };

        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: initialCenter,
        });

        let markers: kakao.maps.Marker[] = [];
        markers.push(marker);

        const map = new window.kakao.maps.Map(mapContainer!, mapOption);

        markers.forEach(
          (marker) => marker.setMap(map) // 지도 위에 마커를 표출합니다
        );

        // 지도 드래그 이벤트 발생 시 마커를 지우고 새로 생성한다.
        kakao.maps.event.addListener(map, "drag", function () {
          markers.forEach((marker) => {
            marker.setMap(null);
          });
          markers = [];
          // 지도 중심좌표를 얻어옵니다
          const latlng = map.getCenter();
          setLocation({
            latitude: latlng.getLat(),
            longitude: latlng.getLng(),
          });

          const markerPosition = new window.kakao.maps.LatLng(
            latlng.getLat(),
            latlng.getLng()
          );

          // 마커를 생성합니다
          const marker = new window.kakao.maps.Marker({
            position: markerPosition,
          });

          markers.push(marker);
          markers.forEach(
            (marker) => marker.setMap(map) // 지도 위에 마커를 표출합니다
          );
        });
      });
    };
    mapScript.addEventListener("load", onLoadKakaoMap);
  }, [coordinates]);

  return <MapWrapper id="map" />;
};

export default KakaoMap;

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
`;
