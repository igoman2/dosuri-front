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

const Maps = () => {
  const { coordinates, loaded } = useGeolocation();
  const theme = useTheme();
  const [mapCenter, setMapCenter] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [fetchEnable, setFetchEnable] = useState(true);
  const [level, setLevel] = useState(4);
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
  const debouncedFilterPrice = useDebounce<number>(filterPrice, 500);
  const filterYear = useRecoilValue(year);
  const debouncedFilterYear = useDebounce<number>(filterYear, 500);
  const [category, setCategory] = useRecoilState(mapFilterState);
  const { data, refetch } = useQuery(
    ["getMapHospitals", category, debouncedFilterPrice, debouncedFilterYear],
    async () => {
      if (mapCenter.latitude === 0 && mapCenter.longitude === 0) {
        return;
      }
      const resp = await getMapHospitals({
        latitude: mapCenter.latitude,
        longitude: mapCenter.longitude,
        distance_range: zoomMap[level],
        map_type: category.key,
        opened_at_range_from: getCurrentDateMinusYears(filterYear),
        opened_at_range_to: dayjs().toISOString(),
        price_range_from: 0,
        price_range_to: filterPrice,
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
      },
    }
  );
  // const swiperHospitals = useMemo(() => {
  //   return isClusterClicked ? hospitalState : data;
  // }, [isClusterClicked, data, hospitalState]);

  // console.log(swiperHospitals);

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

  // const onClusterClick = (
  //   target: kakao.maps.MarkerClusterer,
  //   cluster: kakao.maps.Cluster
  // ) => {
  //   setIsClusterClicked(true);
  //   hospitals.current = [];

  //   const markers = cluster.getMarkers() as ExtendedMarkerType[];
  //   const markersInCluster: string[] = [];

  //   markers.forEach((marker) => {
  //     markersInCluster.push(marker.id);
  //   });
  //   const hospitalsInCluster =
  //     data?.filter((item) => markersInCluster.includes(item.uuid)) ?? [];
  //   hospitals.current = hospitalsInCluster;
  //   setHospitalState(hospitalsInCluster);
  //   // if (!prevTarget.current) {
  //   //   prevTarget.current = cluster;
  //   // } else {
  //   //   prevTarget.current.getClusterMarker().getContent().style.border = "none";
  //   //   prevTarget.current = cluster;
  //   // }
  //   const content = cluster.getClusterMarker().getContent() as HTMLElement;
  //   content.style.border = "1px solid #6666D9";
  // };

  useEffect(() => {
    setMapCenter({
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    });
  }, [coordinates, loaded]);

  // useEffect(() => {
  //   let marker: kakao.maps.MarkerClusterer = markerClusterer;

  //   if (marker) {
  //     const onClustered = (clusters: kakao.maps.Cluster[]) => {
  //       clusters.map((cluster) => {
  //         const markers = cluster.getMarkers() as ExtendedMarkerType[];
  //         const markersInCluster: string[] = [];

  //         markers.forEach((marker) => {
  //           markersInCluster.push(marker.id);
  //         });
  //         const hospitalsInCluster =
  //           data?.filter((item) => markersInCluster.includes(item.uuid)) ?? [];
  //         hospitals.current = hospitalsInCluster;
  //         setHospitalState(hospitalsInCluster);
  //         let average;

  //         const sum = hospitalsInCluster.reduce((acc, cur) => {
  //           return cur.avg_price_per_hour + acc;
  //         }, 0);
  //         if (hospitalsInCluster.length === 0) {
  //           average = 0;
  //         } else {
  //           average = Math.floor(sum / hospitalsInCluster.length);
  //         }
  //         const content = cluster
  //           .getClusterMarker()
  //           .getContent() as HTMLElement;

  //         content.removeAttribute("style");

  //         content.innerHTML = `<div style="position: relative">
  //           <div style="display:flex; border-radius: 5px; font-size:14px; background:white; font-weight:bold; border:none; padding: 1rem 0.5rem;">${formatMoney(
  //             average
  //           )}</div>
  //           <div style="position: absolute; top:-6px; right:-6px; border-radius:50%; color: white; background-color: #6666D9; width:14px; height:14px; display:flex; justify-content: center; align-items: center; font-size:10px;">
  //           ${cluster.getMarkers().length}
  //           </div>
  //             </div>

  //             `;
  //       });
  //     };

  //     marker.addListener("clustered", onClustered); // 내부 API 테스트 필요

  //     return () => {
  //       marker.removeListener("clustered", onClustered);
  //     };
  //   }
  // }, [markerClusterer]);

  if (!loaded) {
    return <Spinner />;
  }

  return (
    <Layout full header={<HeaderDepth bottomLine />} footer={false}>
      <FilterSection category={category} setCategory={setCategory} />
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
          style={{ width: "100%", height: "100%", position: "relative" }}
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
                  {formatMoney(pos.avg_price_per_hour)}
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
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, -10%)",
            width: "90%",
            padding: "0 1em",
            borderRadius: "0.5rem",
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
                    <a>{<HospitalCard hospitalInfo={item} type="price" />}</a>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <FilterOptionModal />
    </Layout>
  );
};

export default Maps;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 9rem;
`;
