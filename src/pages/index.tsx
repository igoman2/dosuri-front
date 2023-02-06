import { IGoodPriceHospitals, IHospitalInfoResult } from "@/service/types";
import React, { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Button from "@/components/Button";
import Header from "@/components/Layout/Header";
import HospitalCard from "@/components/Card/HospitalCard";
import Layout from "@/components/Layout";
import Link from "next/link";
import { NextSeo } from "next-seo";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import { getHospitalInfoHome } from "@/service/apis/hospital";
import { getHotCommunity } from "@/service/apis/community";
import { locationState } from "@/store/location";
import { queryKeys } from "@/service/react-query/constants";
import styled from "@emotion/styled";
import useAuth from "@/hooks/useAuth";
import useGeolocation from "@/hooks/useGeolocation";
import { useQuery } from "react-query";
import { useTheme } from "@emotion/react";
import { userInfoState } from "@/store/user";

const Home = () => {
  const theme = useTheme();

  const userInfo = useRecoilValue(userInfoState);
  const { isLoggedIn } = useAuth();
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);

  useEffect(() => {
    if (location.loaded) {
      setLocaton({
        lat: location.coordinates?.lat ?? 0,
        lng: location.coordinates?.lng ?? 0,
      });
    }
  }, [location]);

  const { data: hospitalList } = useQuery(
    queryKeys.hospital,
    getHospitalInfoHome
  );
  const { data: hotCommunity } = useQuery("getHotCommunity", getHotCommunity);

  if (!hospitalList || !hotCommunity) {
    return;
  }

  return (
    <Layout header={<Header left={true} center={true} />}>
      <NextSeo title="도수리 | 도수치료 리얼후기" />
      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        {hospitalList.top_hospitals.length !== 0 && (
          <>
            <div
              css={{
                fontSize: theme.fontSizes.xl,
                fontWeight: 700,
              }}
            >
              {isLoggedIn
                ? `${userInfo.address.small_area} 주변 TOP 병원`
                : "도수리 TOP 병원"}
            </div>

            {hospitalList.top_hospitals.map(
              (hospital: IHospitalInfoResult, i) => (
                <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
                  <a>
                    <HospitalCard hospitalInfo={hospital} />
                  </a>
                </Link>
              )
            )}
          </>
        )}
      </div>
      <LogginBanner>
        {!isLoggedIn && (
          <Link href="/login">
            <a>
              <Button
                text="로그인하고 내 주변 TOP 병원 보기"
                backgroundColor={theme.colors.purple_light}
                borderRadius="0.3rem"
                height="5.2rem"
                bold
                width="100%"
              />
            </a>
          </Link>
        )}
      </LogginBanner>

      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        {hospitalList.new_hospitals.length !== 0 && (
          <>
            <div
              css={{
                fontSize: theme.fontSizes.xl,
                fontWeight: 700,
              }}
            >
              새로 생긴 병원
            </div>

            {hospitalList.new_hospitals.map(
              (hospital: IHospitalInfoResult, i) => (
                <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
                  <a>
                    <HospitalCard hospitalInfo={hospital} />
                  </a>
                </Link>
              )
            )}
          </>
        )}
      </div>

      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        {hospitalList.good_price_hospitals.length !== 0 && (
          <>
            <div
              css={{
                fontSize: theme.fontSizes.xl,
                fontWeight: 700,
              }}
            >
              가격이 착한 병원
            </div>

            {hospitalList.good_price_hospitals.map(
              (hospital: IGoodPriceHospitals, i) => (
                <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
                  <a>
                    <HospitalCard hospitalInfo={hospital} type="price" />
                  </a>
                </Link>
              )
            )}
          </>
        )}
      </div>

      <LogginBanner>
        {!isLoggedIn && (
          <Link href="/login">
            <a>
              <Button
                text="로그인하고 내 주변 TOP 병원 보기"
                backgroundColor={theme.colors.purple_light}
                borderRadius="0.3rem"
                height="5.2rem"
                bold
                width="100%"
              />
            </a>
          </Link>
        )}
      </LogginBanner>

      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        <div
          css={{
            fontSize: theme.fontSizes.xl,
            fontWeight: 700,
          }}
        >
          HOT 도수톡
        </div>
        {hotCommunity.results.map((review, i) => (
          <Link href={`community/${review.uuid}`} key={review.uuid}>
            <a>
              <PostCard
                review={review}
                bottom={<PostBottom review={review} type="list" />}
              />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Home;

const LogginBanner = styled.div`
  margin-bottom: 2rem;
`;
