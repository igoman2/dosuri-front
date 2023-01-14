import React, { FC } from "react";

import { EmptyText } from "@/components/UI/emotion/EmptyText";
import { IGetHospitalInfo } from "@/service/types";
import PostBottom from "@/components/Card/PostCard/PostBottom";
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
      const data = await getHospitalReviews({
        uuid: hospitalData.uuid,
        ordering: "-created_at",
      });
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
              <PostCard
                review={review}
                bottom={<PostBottom review={review} type="list" />}
              />
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
