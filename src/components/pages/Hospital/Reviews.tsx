import { IGetHospitalInfo, IHospitalReviewsResult } from "@/service/types";
import React, { FC } from "react";

import { EmptyText } from "@/components/UI/emotion/EmptyText";
import Icon from "@/util/Icon";
import PostBottom from "@/components/UI/emotion/PostBottom";
import PostCard from "@/components/Card/PostCard";
import { getHospitalReviews } from "@/service/apis/community";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

interface IReviewsProps {
  hospitalData: IGetHospitalInfo;
}

const Reviews: FC<IReviewsProps> = ({ hospitalData }) => {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["getHospitalReviews", hospitalData.uuid],
    queryFn: async () => {
      const data = await getHospitalReviews(hospitalData.uuid);
      return data!;
    },
  });

  if (!data) {
    return null;
  }

  const handleReviewClick = (uuid: string) => {
    router.push({
      pathname: `/community/${uuid}`,
    });
  };
  const renderPostBottom = (review: IHospitalReviewsResult) => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="17" height="17" />
            <span>{review.up_count}</span>
          </div>
          <div className="comment">
            <Icon name="comment" width="17" height="17" />
            <span>{review.comment_count}</span>
          </div>
        </div>
      </PostBottom>
    );
  };

  return (
    <ReviewsWrapper>
      {data.results.length === 0 ? (
        <EmptyText>등록된 후기가 없습니다.</EmptyText>
      ) : (
        <>
          <div className="title">
            후기
            <span className="list-length"> {data.count}</span>건
          </div>
          {data.results.map((review) => (
            <div
              className="link"
              onClick={() => handleReviewClick(review.uuid)}
              key={review.uuid}
            >
              <PostCard review={review} bottom={renderPostBottom(review)} />
            </div>
          ))}
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

  .link {
    cursor: pointer;
  }
`;
