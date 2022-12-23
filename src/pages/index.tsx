import React, { useEffect } from "react";

import Button from "@/components/Button";
import { GetServerSideProps } from "next";
import Header from "@/components/Layout/Header";
import HospitalCard from "@/components/Card/HospitalCard";
import { IHospitalInfoResult } from "@/service/types";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import Link from "next/link";
import { Post } from "@/mock/posts";
import PostCard from "@/components/Card/PostCard";
import { getCookie } from "cookies-next";
import { getHospitalInfoHome } from "@/service/apis";
import { locationState } from "@/store/location";
import styled from "@emotion/styled";
import useAuth from "@/hooks/useAuth";
import useGeolocation from "@/hooks/useGeolocation";
import { useQuery } from "react-query";
import { useSetRecoilState } from "recoil";
import { useTheme } from "@emotion/react";

const Home = () => {
  const theme = useTheme();
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    setLocaton({
      lat: location.coordinates?.lat ?? 0,
      lng: location.coordinates?.lng ?? 0,
    });
  }, [location]);

  const renderPostBottom = (post: Post) => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="20" height="20" />
            <span>좋아요</span>
          </div>
        </div>
      </PostBottom>
    );
  };

  const { data } = useQuery("getHospitalList-home", getHospitalInfoHome);
  if (!data) {
    return;
  }

  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
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
          {isLoggedIn ? "내 주변 TOP 병원" : "도수리 TOP 병원"}
        </div>

        {data.top_hospitals.map((hospital: IHospitalInfoResult, i) => (
          <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <HospitalCard hospitalInfo={hospital} />
            </a>
          </Link>
        ))}
      </div>
      <LogginBanner>
        {isLoggedIn && (
          <Link href="/login">
            <a>
              <Button
                text="로그인하고 내 주변 TOP 병원 보기"
                backgroundColor={theme.colors.purple_light}
                borderRadius="3"
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
          새로 생긴 병원
        </div>

        {data.new_hospitals.map((hospital: IHospitalInfoResult, i) => (
          <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <HospitalCard hospitalInfo={hospital} />
            </a>
          </Link>
        ))}
      </div>

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
          가격이 착한 병원
        </div>

        {data.good_price_hospitals.map((hospital: IHospitalInfoResult, i) => (
          <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <HospitalCard hospitalInfo={hospital} />
            </a>
          </Link>
        ))}
      </div>

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
          후기가 좋은 병원
        </div>

        {data.good_review_hospitals.map((hospital: IHospitalInfoResult, i) => (
          <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <HospitalCard hospitalInfo={hospital} />
            </a>
          </Link>
        ))}
      </div>

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
        {/* {posts.map((post, i) => (
          <PostCard post={post} key={i} bottom={renderPostBottom(post)} />
        ))} */}
      </div>
    </Layout>
  );
};

export default Home;

const PostBottom = styled.div`
  .post-bottom {
    display: flex;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    color: ${(props) => props.theme.colors.grey};

    .heart {
      display: flex;
      gap: 0.6rem;
      align-items: center;
    }
  }
`;

const LogginBanner = styled.div`
  margin-bottom: 2rem;
`;
