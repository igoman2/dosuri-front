import DoSwiper from "@/components/Swiper";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import React, { FC } from "react";

export interface Review {
  nickname: string;
  registered: string;
  hospitalName: string;
  images: string[];
  review: string;
  heart: number;
  comment: number;
}

interface IReveiwCardProps {
  review: Review;
}

const ReviewCard: FC<IReveiwCardProps> = ({ review }) => {
  return (
    <ReviewCardWrapper>
      <div className="review-head">
        <div className="nickname">{review.nickname}</div>
        <div className="register-time">{review.registered}</div>
      </div>
      <div className="hospital-name">{review.hospitalName}</div>
      <div className="swiper-layout">
        <DoSwiper source={review.images} />
      </div>

      <div className="review-comment">{review.review}</div>
      <div className="review-bottom">
        <div className="heart">
          <Icon name="heart" />
          <span>{review.heart}</span>
        </div>
        <div className="comment">
          <Icon name="comment" />
          <span>{review.comment}</span>
        </div>
      </div>
    </ReviewCardWrapper>
  );
};

export default ReviewCard;

const ReviewCardWrapper = styled.div`
  margin-bottom: 2rem;

  .review-head {
    display: flex;
    gap: 1rem;

    .nickname {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
    }

    .register-time {
      margin: auto 0;
      color: ${(props) => props.theme.colors.grey};
      font-size: ${(props) => props.theme.fontSizes.sm};
      line-height: ${(props) => props.theme.lineHeights.sm};
    }
  }

  .hospital-name {
    margin-top: 0.5rem;
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
  }

  .swiper-layout {
    margin: 1rem 0;
  }

  .review-comment {
    margin-bottom: 1rem;
  }

  .review-bottom {
    display: flex;
    gap: 1rem;

    .heart {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
    .comment {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
  }
`;
