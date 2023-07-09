import { IGoodPriceHospitals, IHospitalInfoResult } from "@/types/service";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PlaystoreIcon from "@/public/assets/playstore_icon.png";
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
import { userInfoState } from "@/store/user";
import SelectAddressBar from "@/components/domain/Address/SelectAddressBar";
import SelectAddressModal from "@/components/domain/Address/SelectAddressModal";
import CloseIcon from "@/public/assets/white-close-button.png";
import { getCookie, setCookie } from "cookies-next";

const Home = () => {
  const theme = useTheme();
  const [banner, setBanner] = useState(true);
  const [hasCookie, setHasCookie] = useState(true);
  const userInfo = useRecoilValue(userInfoState);
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

  const getPopUpExpireDate = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  };

  const onCloseBanner = () => {
    const expires = getPopUpExpireDate(1);
    setCookie("BANNER_EXPIRES", true, { path: "/", expires });
    setBanner(false);
  };

  const onInstall = () => {
    const mobileType = navigator.userAgent.toLowerCase();
    console.log(mobileType);

    if (mobileType.indexOf("Android") > -1) {
      return window.open("https://naver.com");
    } else if (
      mobileType.indexOf("iPhone") > -1 ||
      mobileType.indexOf("iPad") > -1 ||
      mobileType.indexOf("mac")
    ) {
      return window.open("https://google.com");
    }
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
          {banner && !hasCookie && (
            <AppBanner>
              <div className="banner">
                <div className="banner-contents">
                  <Image
                    src={PlaystoreIcon}
                    alt="playstoreIcon"
                    width={40}
                    height={40}
                  />
                  <div className="text text-content">
                    도수리 앱에서 훨씬
                    <br /> 편리하게 이용하기
                  </div>
                  <div className="install-button text" onClick={onInstall}>
                    앱 설치
                  </div>
                </div>
                <div className="close-button" onClick={onCloseBanner}>
                  <Image
                    src={CloseIcon}
                    alt="closeIcon"
                    width={10}
                    height={10}
                  />
                </div>
              </div>
            </AppBanner>
          )}
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

const AppBanner = styled.div`
  position: fixed;
  top: 0px;
  height: 8rem;
  width: calc(100% - 4rem);
  max-width: 40rem;
  background-color: rgba(0, 0, 0, 0.8);

  .banner {
    display: flex;
    height: 8rem;
    justify-content: space-between;

    .banner-contents {
      display: flex;
      align-items: center;
      padding-left: 2rem;
    }

    .text-content {
      width: 12.1rem;
      height: 4rem;
      margin-left: 1rem;
    }

    .text {
      color: white;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.fontSizes.lg};
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    .install-button {
      margin-left: 3rem;
      width: 8.8rem;
      height: 3.4rem;
      justify-content: center;
      border-radius: 0.3rem;
      background-color: ${(props) => props.theme.colors.purple};
      cursor: pointer;
    }

    .close-button {
      margin-top: 1.1rem;
      margin-right: 1.1rem;
      cursor: pointer;
    }
  }
`;

const LogginBanner = styled.div`
  margin-bottom: 2rem;
`;

const EmptyTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;
