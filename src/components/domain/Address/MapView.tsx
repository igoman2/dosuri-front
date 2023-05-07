import React, { useState } from "react";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import Icon from "@/util/Icon";
import { useSetRecoilState } from "recoil";
import { addressModeState, selectedAddressObject } from "./store";
import KakaoMap from "../../etc/KakaoMap";
import { Document } from "@/types/service";
import useGeolocation from "@/hooks/useGeolocation";
import Spinner from "@/components/Spinner/Spinner";
import { Address } from "@/types/location";
import { useRouter } from "next/router";

const MapView = () => {
  const router = useRouter();
  const setMode = useSetRecoilState(addressModeState);
  const setSelectedAddressObject = useSetRecoilState(selectedAddressObject);
  const { coordinates, loaded } = useGeolocation();
  const [locationInfo, setLocationInfo] = useState<Document>({
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
  });

  const handleLocationInfo = (value: Document) => {
    setLocationInfo(value);
  };

  const theme = useTheme();

  const extractAddressNumber = (address: Address) => {
    if (!!address.sub_address_no) {
      return `${address.main_address_no}-${address.sub_address_no}`;
    } else {
      return address.main_address_no;
    }
  };

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

  const handleSetLocation = () => {
    setSelectedAddressObject((prev) => {
      return {
        ...prev,
        name: simpleAddress(),
        address: detailAddress(),
      };
    });

    console.log(router.asPath);
    if (router.asPath.includes("mypage")) {
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

        <KakaoMap
          locationInfo={locationInfo}
          setLocationInfo={handleLocationInfo}
          coordinates={coordinates}
          loaded={loaded}
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
  }

  .detail-address {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
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
