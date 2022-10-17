import ReviewCard from "@/components/Card/ReviewCard";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import styled from "@emotion/styled";
import React from "react";
import { reviews } from "@/mock/reviews";

const Review = () => {
  return (
    <Layout header={<HeaderDepth />}>
      <ReviewWrapper>
        <div className="sub-title">내 후기 총 2개</div>

        {reviews.map((review, i) => (
          <ReviewCard review={review} key={i} />
        ))}
      </ReviewWrapper>
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

  .card-wrapper {
  }
`;
