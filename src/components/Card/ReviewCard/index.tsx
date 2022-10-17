import DoSwiper from "@/components/DoSwiper";
import Divider from "@/components/UI/Divider";
import { Review } from "@/mock/reviews";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import React, { FC, useEffect, useRef, useState } from "react";

interface IReveiwCardProps {
  review: Review;
}

const ReviewCard: FC<IReveiwCardProps> = ({ review }) => {
  const [isCommentOver3Line, setIsCommentOver3Line] = useState<boolean>();
  const [isShowMoreClicked, setIsShowMoreClicked] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const showCommentMoreRef = useRef<HTMLDivElement>(null);

  const getCommentHeight = () => {
    const currentElementHeight = commentRef?.current!.scrollHeight;
    if (currentElementHeight > 66) {
      setIsCommentOver3Line(true);
    } else {
      setIsCommentOver3Line(false);
    }
  };

  useEffect(() => {
    getCommentHeight();
    window.addEventListener("resize", getCommentHeight);

    return () => {
      window.removeEventListener("resize", getCommentHeight);
    };
  });

  const showCommentMore = () => {
    if (showCommentMoreRef.current) {
      setIsShowMoreClicked(true);
    }
  };

  const showMoreRender = () => {
    if (isShowMoreClicked) {
      return null;
    } else {
      if (isCommentOver3Line)
        return (
          <div
            className="comment-show"
            onClick={showCommentMore}
            ref={showCommentMoreRef}
          >
            더보기
          </div>
        );
    }
  };

  return (
    <>
      <ReviewCardWrapper>
        <div className="review-head">
          <div className="nickname">{review.nickname}</div>
          <div className="register-time">{review.registered}</div>
        </div>
        <div className="hospital-name">{review.hospitalName}</div>
        <div className="swiper-layout">
          <DoSwiper source={review.images} />
        </div>
        <div className="review-comment">
          <div
            className={!isShowMoreClicked && isCommentOver3Line ? "hide" : ""}
            ref={commentRef}
          >
            {review.review}
          </div>
          {showMoreRender()}
        </div>
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
      <Divider height={1} />
    </>
  );
};

export default ReviewCard;

const ReviewCardWrapper = styled.div`
  margin: 1rem 0;

  .review-head {
    display: flex;
    gap: 1rem;

    .nickname {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      font-weight: 700;
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
    & .hide {
      overflow-y: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    margin-bottom: 1rem;
  }

  .comment-show {
    margin-top: 0.5rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }

  .review-bottom {
    display: flex;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
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
