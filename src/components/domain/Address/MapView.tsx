import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import Icon from "@/util/Icon";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  addressModeState,
  locationState,
  selectedAddressObject,
} from "./store";
import KakaoMap from "../../etc/KakaoMap";
import { KakaoMapViewLocation } from "@/types/service";
import useGeolocation from "@/hooks/useGeolocation";
import Spinner from "@/components/Spinner/Spinner";
import { Address } from "@/types/location";
import { useRouter } from "next/router";
import Image from "next/image";
import CurrentLocationIcon from "@/public/assets/current-location.png";

const MapView = () => {
  const router = useRouter();
  const setMode = useSetRecoilState(addressModeState);
  const setSelectedAddressObject = useSetRecoilState(selectedAddressObject);
  const { coordinates, loaded } = useGeolocation();
  const [location, setLocation] = useRecoilState(locationState);
  const [isValidAddress, setIsValidAddress] = useState(true);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any>();
  const [mapCenter, setMapCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [locationInfo, setLocationInfo] = useState<KakaoMapViewLocation>({
    address: {
      address_name: "",
      region_1depth_name: "",
      region_2depth_name: "",
      region_3depth_name: "",
      mountain_yn: "",
      main_address_no: "",
      sub_address_no: "",
    },
    road_address: {
      address_name: "",
      region_1depth_name: "",
      region_2depth_name: "",
      region_3depth_name: "",
      road_name: "",
      underground_yn: "",
      main_building_no: "",
      sub_building_no: "",
      building_name: "",
    },
    longitude: 0,
    latitude: 0,
  });
  const theme = useTheme();

  const extractAddressNumber = (address: Address) => {
    if (!!address.sub_address_no) {
      return `${address.main_address_no}-${address.sub_address_no}`;
    } else {
      return address.main_address_no;
    }
  };

  useEffect(() => {
    markersRef.current = [];
  }, []);
  const simpleAddress = () => {
    if (
      locationInfo &&
      locationInfo.road_address &&
      locationInfo.road_address.building_name
    ) {
      return locationInfo.road_address.building_name;
    } else {
      if (locationInfo && locationInfo.address)
        return `${
          locationInfo.address.region_3depth_name
        } ${extractAddressNumber(locationInfo.address)}`;
      else {
        return "";
      }
    }
  };

  const detailAddress = () => {
    if (
      locationInfo &&
      locationInfo.road_address &&
      locationInfo.road_address.address_name
    ) {
      return locationInfo.road_address.address_name;
    } else {
      if (
        locationInfo &&
        locationInfo.address &&
        locationInfo.address.address_name
      ) {
        return locationInfo.address.address_name;
      } else {
        return "";
      }
    }
  };

  const handleMapCenter = ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }) => {
    setMapCenter({ latitude, longitude });
  };

  const handleSetLocation = () => {
    setSelectedAddressObject((prev) => {
      if (prev.address_type === "etc") {
        return {
          ...prev,
          address: detailAddress(),
          latitude: locationInfo.latitude,
          longitude: locationInfo.longitude,
        };
      } else {
        return {
          ...prev,
          name: simpleAddress(),
          address: detailAddress(),
          latitude: locationInfo.latitude,
          longitude: locationInfo.longitude,
        };
      }
    });

    setLocation({
      latitude: locationInfo.latitude,
      longitude: locationInfo.longitude,
    });

    if (router.asPath === "/mypage") {
      setMode((prev) => [...prev, 7]);
    } else {
      setMode((prev) => [...prev, 2]);
    }
  };

  if (!loaded) {
    return <Spinner />;
  }

  if (loaded && (coordinates?.latitude === 0 || coordinates?.longitude === 0)) {
    return <Spinner />;
  }

  const deleteMarkers = () => {
    markersRef.current.forEach((marker: kakao.maps.Marker) => {
      marker.setMap(null);
    });
    markersRef.current;
  };

  const showMarkers = () => {
    markersRef.current.forEach((marker: kakao.maps.Marker) =>
      marker.setMap(mapRef.current!)
    );
  };

  const onCurrentLocation = () => {
    goToCurrentLocation();
  };

  const goToCurrentLocation = () => {
    deleteMarkers();

    const initialCenter = new window.kakao.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude
    );

    setMapCenter({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });

    const marker = new window.kakao.maps.Marker({
      position: initialCenter,
    });

    markersRef.current.push(marker);

    const moveLatLon = new kakao.maps.LatLng(
      coordinates.latitude,
      coordinates.longitude
    );
    mapRef.current.setCenter(moveLatLon);

    if (mapRef && mapRef.current) {
      deleteMarkers();
      markersRef.current.shift();

      showMarkers();
    }
  };

  const handleValidAddress = (value: boolean) => {
    setIsValidAddress(value);
  };

  const handleLocationInfo = (value: KakaoMapViewLocation) => {
    setLocationInfo(value);
  };

  return (
    <>
      <Wrapper>
        <IconWrapper
          onClick={() => {
            setMode((prev) => prev.slice(0, prev.length - 1));
          }}
        >
          <Icon
            name="arrow"
            width="24"
            height="24"
            stroke="black"
            strokeWidth="2"
          />
        </IconWrapper>

        <CurrentLocation onClick={onCurrentLocation}>
          <div>
            <Image
              src={CurrentLocationIcon}
              alt="buttonTypeIcon"
              width={24}
              height={24}
            ></Image>
          </div>
        </CurrentLocation>

        <KakaoMap
          locationInfo={locationInfo}
          setLocationInfo={handleLocationInfo}
          coordinates={coordinates}
          loaded={loaded}
          isValidAddress={isValidAddress}
          setIsValidAddress={handleValidAddress}
          mapRef={mapRef}
          markersRef={markersRef}
          deleteMarkers={deleteMarkers}
          showMarkers={showMarkers}
          mapCenter={mapCenter}
          setMapCenter={handleMapCenter}
          // map={map}
          // setMap={handleMap}
        />
        <SaleButtonWrapper>
          <div className="simple-address">{simpleAddress()}</div>
          <div className="detail-address">{detailAddress()}</div>
          <ButtonWrapper>
            <Button
              text="설정하기"
              width="100%"
              borderRadius="0.3rem"
              height="5.2rem"
              backgroundColor={theme.colors.purple_light}
              bold
              onClick={handleSetLocation}
              disabled={!isValidAddress}
            />
          </ButtonWrapper>
        </SaleButtonWrapper>
      </Wrapper>
    </>
  );
};

export default MapView;

const IconWrapper = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 100;
`;

const CurrentLocation = styled.div`
  position: absolute;
  top: calc(100% - 5rem);
  left: calc(100% - 5rem);
  z-index: 100;

  div {
    background-color: white;
    width: 3.3rem;
    height: 3.3rem;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: calc(100% - 172px);

  .simple-address {
    margin-top: 2.5rem;
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
    font-weight: 700;
    height: 2.8rem;
    overflow: hidden;
  }

  .detail-address {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    height: 2.2rem;
    overflow: hidden;
  }
`;

const SaleButtonWrapper = styled.div`
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
`;

const ButtonWrapper = styled.div`
  padding: 1rem 0;
`;
