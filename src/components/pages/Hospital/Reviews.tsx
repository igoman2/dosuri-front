import { IGetHospitalInfo, IHotCommunityResponse } from "@/service/types";
import React, { FC, useMemo } from "react";

import { EmptyText } from "@/components/UI/emotion/EmptyText";
import InfiniteScroll from "react-infinite-scroller";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import api from "@/service/axiosConfig";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "react-query";
import Link from "next/link";

interface IReviewsProps {
  hospitalData: IGetHospitalInfo;
}

type LoadMore = (page: number) => void;

const Reviews: FC<IReviewsProps> = ({ hospitalData }) => {
  const initialUrl = useMemo(() => {
    return `/community/v1/community/articles?hospital=${hospitalData.uuid}&ordering=-created_at`;
  }, []);

  const fetchUrl = async (url: string) => {
    const response = await api.get<IHotCommunityResponse>(url);
    return response.data;
  };

  const {
    data: reviews,
    isSuccess,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(
    ["getHospitalReviews", hospitalData.uuid],
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

  return (
    <ReviewsWrapper>
      {isSuccess && reviews?.pages.length === 0 ? (
        <EmptyText>등록된 후기가 없습니다.</EmptyText>
      ) : (
        <>
          <div className="title">
            <span>후기 </span>
            <span className="list-length">
              {reviews?.pages[0].count.toLocaleString()}
            </span>
            건
          </div>
          <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
            {reviews?.pages.map((pageData) => {
              return pageData.results.map((review) => {
                return (
                  <Link href={`/community/${review.uuid}`} key={review.uuid}>
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
        </>
      )}
    </ReviewsWrapper>
  );
};

export default Reviews;

const ReviewsWrapper = styled.div`
  .title {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
  }

  .list-length {
    color: ${(props) => props.theme.colors.purple};
  }
`;
