import { DefaultLocation } from "@/constants/Map";
import { Location } from "@/types/location";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";
import dayjs from "dayjs";
import _ from "lodash";

interface locationType {
  loaded: boolean;
  coordinates: Location;
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: { latitude: 0, longitude: 0 },
  });

  // 성공에 대한 로직
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
    // 한 번 가져온 위치는 5분동안 캐싱
    setCookie(
      "getLocation",
      {
        latitude: location.coords.latitude.toString(),
        longitude: location.coords.longitude.toString(),
      },
      {
        expires: dayjs().add(5, "minutes").toDate(),
      }
    );
    setLocation({
      loaded: true,
      coordinates: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    });
  };

  // 에러에 대한 로직
  const onError = (error: { code: number; message: string }) => {
    setLocation({
      loaded: true,
      coordinates: {
        latitude: DefaultLocation.LATITUDE,
        longitude: DefaultLocation.LONGITUDE,
      },
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      // navigator 객체 안에 geolocation이 없다면
      // 위치 정보가 없는 것.
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      const cachedLocation = getCookie("getLocation") as string;

      // 쿠키에 위치 정보가 없으면
      if (_.isNil(cachedLocation)) {
        navigator.geolocation.getCurrentPosition(onSuccess, onError, {
          enableHighAccuracy: true,
        });
      } else {
        setLocation({
          loaded: true,
          coordinates: {
            latitude: DefaultLocation.LATITUDE,
            longitude: DefaultLocation.LONGITUDE,
          },
        });
      }
    }
  }, []);

  return location;
};

export default useGeolocation;
