import HospitalCard, { HospitalInfo } from "@/components/Card/HospitalCard";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import { useTheme } from "@emotion/react";
import React from "react";
import SampleImage from "@/public/assets/sample.png";
import DoctorCard, { DoctorInfo } from "@/components/Card/DoctorCard";
import Icon from "@/util/Icon";
import { Post, posts } from "@/mock/posts";
import PostCard from "@/components/Card/PostCard";
import styled from "@emotion/styled";

const Home = () => {
  const theme = useTheme();

  const list: HospitalInfo[] = [
    {
      title: "압구정강남바른정형외과의원",
      location: "신사동",
      reviewConut: 1,
      thunbCount: 11,
      recentReview: (
        <>
          <Icon
            name="talk_square"
            width="16"
            height="15"
            fill={theme.colors.purple}
          />
          친절한 의료진과 주차가 편합니다
        </>
      ),
      hospitalImage: SampleImage,
    },
    {
      title: "두발로병원",
      location: "압구정동",
      reviewConut: 0,
      thunbCount: 0,
      recentReview: null,
      hospitalImage: SampleImage,
    },
    {
      title: "압구정강남바른정형외과의원",
      location: "신사동",
      reviewConut: 1,
      thunbCount: 11,
      recentReview: (
        <>
          <Icon
            name="talk_square"
            width="16"
            height="15"
            fill={theme.colors.purple}
          />
          친절한 의료진과 주차가 편합니다
        </>
      ),
      hospitalImage: SampleImage,
    },
  ];

  const doctorList: DoctorInfo[] = [
    {
      title: "압구정강남바른정형외과의원",
      location: "신사동",
      reviewConut: 1,
      thunbCount: 11,
      recentReview: "#도수 #마취 #비수술",
      hospitalImage: SampleImage,
    },
    {
      title: "압구정강남바른정형외과의원",
      location: "신사동",
      reviewConut: 1,
      thunbCount: 11,
      recentReview: "#도수 #마취 #비수술",
      hospitalImage: SampleImage,
    },
    {
      title: "압구정강남바른정형외과의원",
      location: "신사동",
      reviewConut: 1,
      thunbCount: 11,
      recentReview: "#도수 #마취 #비수술",
      hospitalImage: SampleImage,
    },
  ];

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
          내 주변 TOP 병원
        </div>

        {list.map((hospital: HospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
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
          새로 생긴 병원
        </div>

        {list.map((hospital: HospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
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

        {list.map((hospital: HospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
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
        {posts.map((post, i) => (
          <PostCard post={post} key={i} bottom={renderPostBottom(post)} />
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
    color: ${(props) => props.theme.colors.grey};

    .heart {
      display: flex;
      gap: 0.6rem;
      align-items: center;
    }
  }
`;
