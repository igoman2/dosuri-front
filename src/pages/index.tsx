import { IGoodPriceHospitals, IHospitalInfoResult } from "@/types/service";
import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Icon from "@/util/Icon";
import Button from "@/components/Button";
import { EmptyText } from "@/components/etc/emotion/EmptyText";
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
import SelectAddressBar from "@/components/domain/Address/SelectAddressBar";
import SelectAddressModal from "@/components/domain/Address/SelectAddressModal";
import { getCookie, setCookie } from "cookies-next";
import AppBanner from "@/components/Banner/AppBanner";
import useRN from "@/hooks/useRN";

const expirationPeriod = 1;

const Home = () => {
  const theme = useTheme();
  const [hasCookie, setHasCookie] = useState(true);
  const { isApp } = useRN();
  const { isLoggedIn } = useAuth();
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);

  useEffect(() => {
    if (location.loaded) {
      setLocaton({
        lat: location.coordinates?.latitude ?? 0,
        lng: location.coordinates?.longitude ?? 0,
      });
    }
  }, [location]);

  useEffect(() => {
    if (getCookie("BANNER_EXPIRES")) return;
    setHasCookie(false);
  }, []);

  const { data: hospitalList } = useQuery(
    queryKeys.hospital,
    getHospitalInfoHome
  );

  const { data: hotCommunity } = useQuery("getHotCommunity", getHotCommunity);

  if (!hospitalList || !hotCommunity) {
    return;
  }

  const getPopUpExpireDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + expirationPeriod);
    return date;
  };

  const onCloseBanner = () => {
    const expires = getPopUpExpireDate();
    setCookie("BANNER_EXPIRES", true, { path: "/", expires });
    setHasCookie(true);
  };

  return (
    <Layout
      header={
        <>
          <Header
            left={true}
            center={isLoggedIn ? <SelectAddressBar /> : <></>}
            right={
              <Link href="/search/input">
                <Icon name="search" />
              </Link>
            }
          />
          {!hasCookie && !isApp && <AppBanner onClose={onCloseBanner} />}
        </>
      }
    >
      <NextSeo
        title="도수리 | 도수치료 리얼후기"
        canonical="https://www.dosuri.site"
        openGraph={{
          url: "https://www.dosuri.site",
        }}
      />

      <section
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
              {`${hospitalList.address} 주변 치료비 싼 병원`}
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
      </section>
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

      <section
        css={{
          marginBottom: "2.5rem",
        }}
      >
        <>
          <div
            css={{
              fontSize: theme.fontSizes.xl,
              fontWeight: 700,
            }}
          >
            새로 생긴 병원
          </div>

          {hospitalList.new_hospitals.length !== 0 ? (
            <>
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
          ) : (
            <EmptyTextWrapper>
              <EmptyText>새로 생긴 병원이 없습니다.</EmptyText>
            </EmptyTextWrapper>
          )}
        </>
      </section>
      <section
        css={{
          marginBottom: "2.5rem",
        }}
      >
        {hospitalList.many_review_hospitals.length !== 0 && (
          <>
            <div
              css={{
                fontSize: theme.fontSizes.xl,
                fontWeight: 700,
              }}
            >
              후기가 좋은 병원
            </div>

            {hospitalList.many_review_hospitals.map(
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
      </section>

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

      <section
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
        {hotCommunity.results.length !== 0 ? (
          <>
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
          </>
        ) : (
          <EmptyTextWrapper>
            <EmptyText>등록된 후기가 없습니다.</EmptyText>
          </EmptyTextWrapper>
        )}
      </section>
      <SelectAddressModal />
    </Layout>
  );
};

export default Home;

const LogginBanner = styled.div`
  margin-bottom: 2rem;
`;

const EmptyTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
