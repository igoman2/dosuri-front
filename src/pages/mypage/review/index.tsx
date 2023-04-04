import React, { useMemo, useState } from "react";

import { EmptyText } from "@/components/etc/emotion/EmptyText";
import Float from "@/components/pages/Community/Float";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import { IHotCommunityResponse } from "@/types/service";
import InfiniteScroll from "react-infinite-scroller";
import Layout from "@/components/Layout";
import ModalFactory from "@/components/pages/Community/Write/Review/ModalFactory";
import { NextSeo } from "next-seo";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import api from "@/service/axiosConfig";
import { queryKeys } from "@/service/react-query/constants";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";
import { useInfiniteQuery } from "react-query";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/user";
import Link from "next/link";

const Review = () => {
  const [scrollDir] = useDirection();
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState<"question" | "review">("question");
  const user = useRecoilValue(userInfoState);

  const initialUrl = useMemo(() => {
    return `/community/v1/community/articles?user=${user.uuid}&ordering=-created_at`;
  }, []);

  const fetchUrl = async (url: string) => {
    const response = await api.get<IHotCommunityResponse>(url);
    return response.data;
  };

  const {
    data: communityList,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    [queryKeys.community, "my-review"],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
    }
  );

  const fetchNextList = () => {
    if (isFetching) {
      return;
    }
    fetchNextPage();
  };

  const handleActive = (val: boolean) => {
    setIsActive(val);
  };

  const handleModalType = (val: "question" | "review") => {
    setModalType(val);
  };

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <NextSeo title="마이페이지 | 도수리-도수치료 리얼후기" />

      <>
        <ReviewWrapper>
          <div className="sub-title">
            내 후기 총 {communityList?.pages[0].count}개
          </div>
          {communityList?.pages[0].count === 0 ? (
            <EmptyText>등록된 후기가 없습니다.</EmptyText>
          ) : (
            <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
              {communityList?.pages.map((pageData) => {
                return pageData.results.map((review) => {
                  return (
                    <Link href={`review/${review.uuid}`} key={review.uuid}>
                      <a>
                        <PostCard
                          review={review}
                          bottom={<PostBottom review={review} type="list" />}
                        />
                      </a>
                    </Link>
                  );
                });
              })}
            </InfiniteScroll>
          )}
        </ReviewWrapper>

        <Float
          scrollDir={scrollDir}
          distance="1.5rem"
          onClick={() => {
            setModalType("review");
            setIsActive(true);
          }}
        />
        {isActive && (
          <ModalFactory
            isActive={isActive}
            setIsActive={handleActive}
            modalType={modalType}
            setModalType={handleModalType}
          />
        )}
      </>
    </Layout>
  );
};

export default Review;

const ReviewWrapper = styled.div`
  .sub-title {
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
`;
