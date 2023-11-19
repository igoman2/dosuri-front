import Layout from "@/components/Layout";
import useGeolocation from "@/hooks/useGeolocation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  MarkerClusterer,
} from "react-kakao-maps-sdk";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import ImageTextView from "@/components/CustomImage/ImageTextView";
import Icon from "@/util/Icon";
import { useQuery } from "react-query";
import { getMapHospitals } from "@/service/apis/hospital";
import { A11y, Scrollbar } from "swiper";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { IGetMapHospitals } from "@/types/service";
import HospitalCard from "@/components/Card/HospitalCard";
import { formatMoney } from "@/util/format";
import { set } from "lodash";
import FilterOptionModal from "@/components/domain/Search/FilterOptionModal";
import {
  price,
  searchModalState,
  year,
} from "@/components/domain/Search/store";
import { useRecoilState, useRecoilValue } from "recoil";
import FilterSection from "@/components/domain/Map/FilterSection";
import { searchFilterState } from "@/store/searchOption";
import { MAP_SELECT_LIST } from "@/mock/searchCategory";
import dayjs from "dayjs";
import { getCurrentDateMinusYears } from "@/util/extractYear";
import { MAX_PRICE, MAX_YEAR } from "@/constants/Filter";
import { useDebounce } from "usehooks-ts";
import Link from "next/link";
import { mapFilterState } from "@/store/mapFilter";
import Spinner from "@/components/Spinner/Spinner";
import { userInfoState } from "@/store/user";
import { useRouter } from "next/router";
import MapFullButton from "@/public/assets/map-full.png";
import Image from "next/image";

type ZoomMap = {
  [key: number]: number;
};
type ExtendedMarkerType = kakao.maps.CustomOverlay & {
  id: string;
};
const zoomMap: ZoomMap = {
  1: 0.05,
  2: 0.1,
  3: 0.25,
  4: 0.5,
  5: 1,
  6: 2,
  7: 2,
  8: 3,
  9: 3,
  10: 4,
  11: 4,
  12: 4,
  13: 4,
  14: 4,
};

const Submap = () => {
  const router = useRouter();
  const { coordinates, loaded } = useGeolocation();
  const theme = useTheme();
  const [mapCenter, setMapCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [fetchEnable, setFetchEnable] = useState(true);
  const [level, setLevel] = useState(5);
  const hospitals = useRef<IGetMapHospitals[]>([]);
  const [isClusterClicked, setIsClusterClicked] = useState(false);
  const [hospitalState, setHospitalState] = useState<IGetMapHospitals[]>([]);
  const [markerClusterer, setMarkerClusterer] = useState<any>(null); // ref 사용 금지, 생성된 이벤트를 가지고 effect 발생시키기 위함.
  const [markerOverlay, setMarkerOverlay] = useState<any>(null); // ref 사용 금지, 생성된 이벤트를 가지고 effect 발생시키기 위함.
  const [customOverlayCreated, setCustomOverlayCreated] = useState(true);
  const prevTarget = useRef<any>(null);
  const [swiperHospitals, setSwiperHospitals] = useState<IGetMapHospitals[]>(
    []
  );
  const currentHospital = useRef<IGetMapHospitals | null>(null);
  const filterPrice = useRecoilValue(price);
  const debouncedMaxFilterPrice = useDebounce<number>(filterPrice.max, 500);
  const debouncedMinFilterPrice = useDebounce<number>(filterPrice.min, 500);
  const filterYear = useRecoilValue(year);
  const debouncedMinFilterYear = useDebounce<number>(filterYear.min, 500);
  const debouncedMaxFilterYear = useDebounce<number>(filterYear.max, 500);
  const [category, setCategory] = useRecoilState(mapFilterState);
  const userInfo = useRecoilValue(userInfoState);

  const { data, refetch } = useQuery(
    [
      "getMapHospitals",
      category,
      debouncedMaxFilterPrice,
      debouncedMaxFilterYear,
      debouncedMinFilterPrice,
      debouncedMinFilterYear,
    ],
    async () => {
      if (mapCenter.latitude === 0 && mapCenter.longitude === 0) {
        return;
      }
      const resp = await getMapHospitals({
        latitude: mapCenter.latitude,
        longitude: mapCenter.longitude,
        distance_range: zoomMap[level],
        map_type: category.key,
        opened_at_range_from: getCurrentDateMinusYears(filterYear.max),
        opened_at_range_to: getCurrentDateMinusYears(filterYear.min),
        price_range_from: filterPrice.min,
        price_range_to: filterPrice.max,
      });
      return resp;
    },
    {
      enabled: mapCenter.latitude !== 0 && mapCenter.longitude !== 0,
      staleTime: 1000,
      cacheTime: 5000,
      suspense: false,
      onSuccess: (resp: IGetMapHospitals[]) => {
        setSwiperHospitals(resp);
        currentHospital.current = resp[0];
        if (resp.length > 0) {
          setMapCenter({
            latitude: Number(resp[0].latitude),
            longitude: Number(resp[0].longitude),
          });
        }
      },
    }
  );

  const handleDrag = (map: kakao.maps.Map) => {
    setMapCenter({
      latitude: map.getCenter().getLat(),
      longitude: map.getCenter().getLng(),
    });
  };

  const onCreateCustomOverlay = (
    marker: ExtendedMarkerType,
    position: IGetMapHospitals
  ) => {
    marker.id = position.uuid;

    data?.filter((item) => {
      if (item.uuid === marker.id) {
        if (!hospitals.current.find((item) => item.uuid === marker.id)) {
          hospitals.current.push(item);
        }
      }
    });
  };

  useEffect(() => {
    setMapCenter({
      latitude: userInfo.address.latitude,
      longitude: userInfo.address.longitude,
    });
  }, [coordinates, loaded]);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <Map
          id="map"
          isPanto
          center={{
            lat: mapCenter.latitude,
            lng: mapCenter.longitude,
          }}
          style={{
            width: "100%",
            height: "100%",
            position: "relative",
            borderRadius: "1rem",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          level={level} // 지도의 확대 레벨
          onDragEnd={(map) => handleDrag(map)}
          onZoomChanged={(map) => {
            setLevel(map.getLevel());
          }}
          onIdle={(map) => {
            setIsClusterClicked(false);
            hospitals.current = [];
          }}
        >
          {/* <MarkerClusterer
            ref={setMarkerClusterer}
            averageCenter={true} // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
            minLevel={3} // 클러스터 할 최소 지도 레벨
            disableClickZoom={true} // 클러스터 마커를 클릭했을 때 지도가 확대되지 않도록 설정한다
            onClusterclick={onClusterClick}
          > */}
          {data &&
            data.map((pos, i) => (
              <CustomOverlayMap
                ref={setMarkerOverlay}
                onCreate={(marker) => {
                  onCreateCustomOverlay(marker as ExtendedMarkerType, pos);
                  setCustomOverlayCreated(true);
                }}
                key={i}
                position={{
                  lat: Number(pos.latitude),
                  lng: Number(pos.longitude),
                }}
                zIndex={currentHospital.current?.uuid === pos.uuid ? 100 : 1}
              >
                <div
                  data-id={pos.uuid}
                  onClick={() => {
                    setIsClusterClicked(true);
                    setSwiperHospitals([pos]);
                    setHospitalState([pos]);
                    currentHospital.current = pos;

                    setMapCenter({
                      latitude: Number(pos.latitude),
                      longitude: Number(pos.longitude),
                    });
                  }}
                  style={{
                    color: "black",
                    fontSize: "1.4rem",
                    textAlign: "center",
                    background: "white",
                    borderRadius: "5px",
                    border:
                      currentHospital.current?.uuid === pos.uuid
                        ? `1px solid ${theme.colors.purple_light}`
                        : `1px solid ${theme.colors.grey_light}`,
                    fontWeight: "bold",
                    padding: "1rem 0.5rem",
                  }}
                >
                  {category.key === "price"
                    ? formatMoney(pos.avg_price_per_hour)
                    : `${pos.article_count}개`}
                </div>
              </CustomOverlayMap>
            ))}
          {/* </MarkerClusterer> */}
          {/* <MapMarker
            key={`${mapCenter.latitude}-${mapCenter.longitude}`}
            position={{
              lat: mapCenter.latitude,
              lng: mapCenter.longitude,
            }}
          /> */}
        </Map>
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: 20,
            left: 0,
            width: "100%",
            zIndex: 50,
          }}
        >
          <Button
            iconName="refresh"
            text="이 지역 재검색"
            shadow
            bold
            backgroundColor={theme.colors.white}
            color={theme.colors.black}
            onClick={() => {
              refetch();
            }}
          />
        </div>
        <div
          css={{
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            top: 20,
            left: 0,
            width: "100%",
            zIndex: 50,
          }}
        >
          <span
            css={{
              position: "absolute",
              top: "-10px",
              right: 0,
              cursor: "pointer",
            }}
            role="button"
            onClick={() => {
              router.push("/map");
            }}
          >
            <Image
              src={MapFullButton}
              width={40}
              height={40}
              alt="map-full-button"
            />
          </span>
        </div>
        <div
          css={{
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, -10%)",
            width: "95%",
            padding: "0 1em",
            borderRadius: "0.5rem",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            zIndex: 3,
          }}
        >
          <Swiper
            modules={[Scrollbar, A11y]}
            scrollbar={{ draggable: true }}
            initialSlide={0}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 3000 }}
            onSlideChange={(swiper) => {
              const hospital = swiperHospitals?.[swiper.activeIndex];
              setMapCenter({
                latitude: Number(hospital?.latitude),
                longitude: Number(hospital?.longitude),
              });
              currentHospital.current = hospital;
            }}
          >
            {swiperHospitals?.map((item: IGetMapHospitals, i) => (
              <SwiperSlide key={i}>
                <div
                  css={{
                    padding: "1rem 0",
                  }}
                >
                  <Link href={`/hospital/${item.uuid}`} key={item.uuid}>
                    <a>
                      {<HospitalCard hospitalInfo={item} type={category.key} />}
                    </a>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <FilterOptionModal />
    </>
  );
};

export default Submap;
