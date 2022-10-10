import DoSwiper from "@/components/Swiper";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import React from "react";

const ReviewCard = () => {
  return (
    <ReviewCardWrapper>
      <div className="review-head">
        <div className="nickname">해리케인</div>
        <div className="register-time">12시간 전</div>
      </div>
      <div className="hospital-name">논현신사정형외과의원</div>
      <div className="swiper-layout">
        <DoSwiper />
      </div>

      <div className="review-comment">
        친절하고 좋아요! 도수 받았는데 시원하고 좋아요~~!
      </div>
      <div className="review-bottom">
        <div className="heart">
          <Icon name="heart" />
          <span>11</span>
        </div>
        <div className="comment">
          <Icon name="comment" />
          <span>11</span>
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
