import {
  IGetLocationByAddressParams,
  IGetLocationByCoordinateParams,
  IGetLocationByKeywordParams,
  LocationType,
} from "@/types/service";
import axios from "axios";

export const getLocationByKeyword = async ({
  query,
}: IGetLocationByKeywordParams) => {
  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/keyword.json",
    {
      params: {
        query,
      },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
      },
    }
  );
  return response.data;
};

export const getLocationByAddress = async ({
  query,
  analyzeType,
}: IGetLocationByAddressParams) => {
  const response = await axios.get(
    "https://dapi.kakao.com/v2/local/search/address.json",
    {
      params: {
        query,
        analyze_type: analyzeType,
      },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
      },
    }
  );
  return response.data;
};

export const getLocationByCoordinate = async ({
  longitude,
  latitude,
}: IGetLocationByCoordinateParams) => {
  const response = await axios.get<LocationType>(
    "https://dapi.kakao.com/v2/local/geo/coord2address.json",
    {
      params: {
        x: longitude,
        y: latitude,
      },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}`,
      },
    }
  );
  return response.data;
};
