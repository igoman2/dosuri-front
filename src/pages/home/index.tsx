import HospitalCard, { HospitalInfo } from "@/components/Card/HospitalCard";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import { useTheme } from "@emotion/react";
import React from "react";
import SampleImage from "@/public/assets/sample.png";
import DoctorCard, { DoctorInfo } from "@/components/Card/DoctorCard";
import Icon from "@/util/Icon";
import ReviewCard, { Review } from "@/components/Card/ReviewCard";

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
        <div>
          <Icon
            name="talk_square"
            width="16"
            height="15"
            fill={theme.colors.purple}
          />
          친절한 의료진과 주차가 편합니다
        </div>
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

  const reviews: Review[] = [
    {
      nickname: "해리케인",
      registered: "12시간전",
      hospitalName: "논현신사정형외과의원",
      images: [
        "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
        "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
        "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
      ],
      review:
        "친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~! 세줄까지만 표시하고 그 이상 넘어가면 더보기로 처리하기 길어지면 세줄처리 길어지면 세줄처리 길어지면 세줄처리",
      heart: 11,
      comment: 11,
    },
    // {
    //   nickname: "해리케인",
    //   registered: "12시간전",
    //   hospitalName: "논현신사정형외과의원",
    //   images: [
    //     "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
    //     "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
    //     "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
    //   ],
    //   review: "친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~!",
    //   heart: 11,
    //   comment: 11,
    // },
    // {
    //   nickname: "해리케인",
    //   registered: "12시간전",
    //   hospitalName: "논현신사정형외과의원",
    //   images: [
    //     "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
    //     "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
    //     "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/sample.png",
    //   ],
    //   review: "친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~!",
    //   heart: 11,
    //   comment: 11,
    // },
  ];

  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      {/* <div
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
          의사 프로필
        </div>

        {doctorList.map((hospital: DoctorInfo, i) => (
          <DoctorCard hospitalInfo={hospital} key={i} />
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
      </div> */}

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
        {reviews.map((review, i) => (
          <ReviewCard review={review} key={i} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
