import ReviewCard from "@/components/Card/ReviewCard";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import styled from "@emotion/styled";
import React from "react";
import { reviews } from "@/mock/reviews";
import Icon from "@/util/Icon";
import Button from "@/components/Button";
import Link from "next/link";

const Review = () => {
  return (
    <Layout header={<HeaderDepth />}>
      <ReviewWrapper>
        <div className="sub-title">내 후기 총 2개</div>

        {reviews.map((review, i) => (
          <Link href={`review/${review.id}`} key={i}>
            <a>
              <ReviewCard review={review} />
            </a>
          </Link>
        ))}
      </ReviewWrapper>

      <Button iconName="pen" text="후기 또는 질문 쓰기" />
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
