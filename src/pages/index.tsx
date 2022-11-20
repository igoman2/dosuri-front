import HospitalCard from "@/components/Card/HospitalCard";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import { useTheme } from "@emotion/react";
import React, { useEffect } from "react";
import Icon from "@/util/Icon";
import { Post, posts } from "@/mock/posts";
import PostCard from "@/components/Card/PostCard";
import styled from "@emotion/styled";
import { HospitalInfo, hospitalList } from "@/mock/hospitals";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apis } from "@/service/api";
import Link from "next/link";

const Home = () => {
  const theme = useTheme();

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

  const { isLoading: getAddressesIsLoading, data: getAddressesData } = useQuery(
    "all",
    apis.getMyInfo,
    {
      retry: 0,
      onSuccess: (resp) => {
        console.log(resp.data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const {
    isLoading: getHospitalKeywordIsLoading,
    data: getHospitalKeywordData,
  } = useQuery("all2", apis.getHospitalKeyword, {
    retry: 0,
    onSuccess: (resp) => {
      console.log(resp.data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  // const { mutate } = useMutation(apis.updateToken, {
  //   onSuccess: () => {
  //     console.log("@@");
  //   },
  // });

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

        {hospitalList.map((hospital: HospitalInfo, i) => (
          <Link href={`/hospital/${hospital.id}`} key={i}>
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
          새로 생긴 병원
        </div>

        {hospitalList.map((hospital: HospitalInfo, i) => (
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

        {hospitalList.map((hospital: HospitalInfo, i) => (
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
