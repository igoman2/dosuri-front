import { Location } from "@/types/location";
import { useEffect, useState } from "react";

interface locationType {
  loaded: boolean;
  coordinates: Location;
  error?: { code: number; message: string };
}

const useGeolocation = () => {
  // location의 default 값은 강남역입니다.
  const DefaultLocation = {
    LATITUDE: 37.497942,
    LONGITUDE: 127.027621,
  };

  const [location, setLocation] = useState<locationType>({
    loaded: false,
    coordinates: {
      latitude: DefaultLocation.LATITUDE,
      longitude: DefaultLocation.LONGITUDE,
    },
  });

  // 성공에 대한 로직
  const onSuccess = (location: {
    coords: { latitude: number; longitude: number };
  }) => {
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
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, {
        enableHighAccuracy: true,
      });
    }
  }, []);

  return location;
};

export default useGeolocation;
