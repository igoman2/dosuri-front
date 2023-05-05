import { IGetHospitalInfo, IHotCommunityResponse } from "@/types/service";
import React, { FC, useMemo } from "react";

import { EmptyText } from "@/components/etc/emotion/EmptyText";
import InfiniteScroll from "react-infinite-scroller";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import api from "@/service/axiosConfig";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "react-query";
import Link from "next/link";
import ReviewBanner from "@/components/domain/Community/ReviewBanner";

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

  const isBannerVisible = (
    parentIndex: number,
    childIndex: number
  ): Boolean => {
    // 처음 5번째
    if (parentIndex === 0 && childIndex === 5) {
      return true;
    }
    // 그 후 20개마다
    // parentIndex !== 0 은 0번째에 나오지 않음을 의미
    else if (parentIndex !== 0 && parentIndex % 2 === 0 && childIndex === 0) {
      return true;
    } else {
      return false;
    }
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
            {reviews?.pages.map((pageData, index1) => {
              return pageData.results.map((review, index2) => {
                return (
                  <>
                    <ReviewBanner parentIndex={index1} childIndex={index2} />
                    <Link href={`/community/${review.uuid}`} key={review.uuid}>
                      <a>
                        <PostCard
                          review={review}
                          bottom={<PostBottom review={review} type="list" />}
                        />
                      </a>
                    </Link>
                  </>
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
