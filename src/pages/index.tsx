import { IHospitalInfoResult, IHospitalReviewsResult } from "@/service/types";
import React, { useEffect } from "react";

import Button from "@/components/Button";
import Header from "@/components/Layout/Header";
import HospitalCard from "@/components/Card/HospitalCard";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostCard from "@/components/Card/PostCard";
import { getHospitalInfoHome } from "@/service/apis/hospital";
import { getHotCommunity } from "@/service/apis/community";
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

  const renderPostBottom = (review: IHospitalReviewsResult) => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="20" height="20" />
            <span>{review.up_count}</span>
          </div>

          <div className="comment">
            <Icon name="comment" width="20" height="20" />
            <span>{review.article_attachment_assoc.length}</span>
          </div>
        </div>
      </PostBottom>
    );
  };

  const { data: hospitalList } = useQuery(
    "getHospitalList",
    getHospitalInfoHome
  );
  const { data: hotCommunity } = useQuery("getHotCommunity", getHotCommunity);

  if (!hospitalList || !hotCommunity) {
    return;
  }

  return (
    <Layout header={<Header left={true} center={true} />}>
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
          {isLoggedIn ? "??? ?????? TOP ??????" : "????????? TOP ??????"}
        </div>

        {hospitalList.top_hospitals.map((hospital: IHospitalInfoResult, i) => (
          <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <HospitalCard hospitalInfo={hospital} />
            </a>
          </Link>
        ))}
      </div>
      <LogginBanner>
        {!isLoggedIn && (
          <Link href="/login">
            <a>
              <Button
                text="??????????????? ??? ?????? TOP ?????? ??????"
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
          ?????? ?????? ??????
        </div>

        {hospitalList.new_hospitals.map((hospital: IHospitalInfoResult, i) => (
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
          ????????? ?????? ??????
        </div>

        {hospitalList.good_price_hospitals.map(
          (hospital: IHospitalInfoResult, i) => (
            <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
              <a>
                <HospitalCard hospitalInfo={hospital} />
              </a>
            </Link>
          )
        )}
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
          ????????? ?????? ??????
        </div>

        {hospitalList.good_review_hospitals.map(
          (hospital: IHospitalInfoResult, i) => (
            <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
              <a>
                <HospitalCard hospitalInfo={hospital} />
              </a>
            </Link>
          )
        )}
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
          HOT ?????????
        </div>
        {hotCommunity.results.map((review, i) => (
          <Link href={`community/${review.uuid}`} key={review.uuid}>
            <a>
              <PostCard
                review={review}
                key={i}
                bottom={renderPostBottom(review)}
              />
            </a>
          </Link>
        ))}
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

    .heart {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }

    .comment {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
  }
`;

const LogginBanner = styled.div`
  margin-bottom: 2rem;
`;
