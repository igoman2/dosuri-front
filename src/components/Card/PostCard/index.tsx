import {
  ICommunityPostDetailResponse,
  IHospitalReviewsResult,
} from "@/service/types";
import React, {
  FC,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import Divider from "@/components/UI/Divider";
import DoSwiper from "@/components/DoSwiper";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface IPostCardProps {
  review: IHospitalReviewsResult | ICommunityPostDetailResponse;
  bottom: ReactNode;
  skip?: boolean;
  hasBackground?: boolean;
}

const PostCard: FC<IPostCardProps> = ({
  review,
  bottom,
  skip = true,
  hasBackground,
}) => {
  const [isCommentOver3Line, setIsCommentOver3Line] = useState<boolean>();
  const [isShowMoreClicked, setIsShowMoreClicked] = useState<boolean>(false);
  const commentRef = useRef<HTMLDivElement>(null);
  const showCommentMoreRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const showCommentMore = (e: MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.preventDefault();
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

  const imageSource = review.article_attachment_assoc.map(
    (attachment) => attachment.attachment.signed_path
  );

  const showMoreButton = () => {
    if (!skip) {
      return false;
    }
    return !isShowMoreClicked && isCommentOver3Line;
  };

  const handleHospitalClick = () => {
    if (skip) {
      return;
    }

    router.push(`/hospital/${review.hospital_uuid}`);
  };

  return (
    <>
      <PostCardWrapper>
        <div className="post-head">
          <div className="nickname">{review.user.nickname}</div>
          <div className="register-time">{review.created_at}</div>
        </div>
        <div className="hospital-name" onClick={handleHospitalClick}>
          {review.hospital}
        </div>
        <div className="swiper-layout">
          {imageSource.length !== 0 && (
            <SwiperWrapper>
              <DoSwiper
                source={imageSource}
                spaceBetween={6}
                slidesPerView={2}
                hasBackground={hasBackground}
              />
            </SwiperWrapper>
          )}
        </div>
        <div className="post-comment">
          <div className={showMoreButton() ? "hide" : ""} ref={commentRef}>
            {review.content}
          </div>
          {showMoreButton() && showMoreRender()}
        </div>
        {bottom}
      </PostCardWrapper>
      <Divider height={1} />
    </>
  );
};

export default PostCard;

const PostCardWrapper = styled.div`
  margin: 1rem 0;

  .post-head {
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
    cursor: pointer;
  }

  .swiper-layout {
    margin: 1rem 0;
  }

  .post-comment {
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
`;

const SwiperWrapper = styled.div`
  div {
    position: relative;
    width: 100%;
    height: 11rem;
    background-color: white;
  }

  .swiper-slide {
    width: 15rem !important;
  }
`;
