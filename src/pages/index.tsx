import HospitalCard from "@/components/Card/HospitalCard";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import { useTheme } from "@emotion/react";
import React, { useEffect, useRef } from "react";
import Icon from "@/util/Icon";
import { Post, posts } from "@/mock/posts";
import PostCard from "@/components/Card/PostCard";
import styled from "@emotion/styled";
import { HospitalInfo, hospitalList } from "@/mock/hospitals";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { apis } from "@/service/api";

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

  const day_input = useRef<HTMLInputElement>(null);
  const time_input = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  // const { isLoading, data } = useQuery("all", apis.getPosts, {
  //   staleTime: 10000,
  // });
  const { mutate } = useMutation(apis.updateToken, {
    onSuccess: () => {
      queryClient.invalidateQueries("all"); //invalidateQueries(무효화 시킬 queryKey 이름)
      if (day_input.current) {
        day_input.current.value = "";
      }

      if (time_input.current) {
        time_input.current.value = "";
      }
    },
  });

  useEffect(() => {
    console.log("@@");
    apis.getPosts();
  }, []);

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
