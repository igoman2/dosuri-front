import HospitalCard, {
  IHospitalCardProps,
} from "@/components/Card/HospitalCard";
import {
  HospitalInfo,
  IHospitalInfo,
  IHospitalInfoResponse,
  hospitalList,
} from "@/mock/hospitals";
import { Post, posts } from "@/mock/posts";
import React, { useEffect, useState } from "react";
import { apis, getHospitalList } from "@/service/apis";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { AxiosError } from "axios";
import Header from "@/components/Layout/Header";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostCard from "@/components/Card/PostCard";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

const Home = () => {
  const theme = useTheme();
  const [hospitals, setHospitals] =
    useState<IHospitalInfoResponse | null>(null);

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

  const { isLoading: getHispitalListIsLoading, data: getHispitalListData } =
    useQuery<IHospitalInfoResponse, AxiosError>({
      queryKey: ["getHospitalList-home"],
      queryFn: async () => {
        const data = await getHospitalList();
        return data;
      },
      retry: 0,
      onSuccess: (res) => {
        setHospitals(res);
        console.log(res.results);
      },
      onError: (err: any) => {
        setHospitals(err.response.data);
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

        {hospitals?.results.map((hospital: IHospitalInfo, i) => (
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
          새로 생긴 병원
        </div>

        {hospitals?.results.map((hospital: IHospitalInfo, i) => (
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

        {hospitals?.results.map((hospital: IHospitalInfo, i) => (
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
