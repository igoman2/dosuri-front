import DoSwiper from "@/components/DoSwiper";
import Divider from "@/components/UI/Divider";
import { Post } from "@/mock/posts";
import styled from "@emotion/styled";
import React, { FC, ReactElement, useEffect, useRef, useState } from "react";

interface IPostCardProps {
  post: Post;
  bottom: ReactElement;
}

const PostCard: FC<IPostCardProps> = ({ post, bottom }) => {
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
      <PostCardWrapper>
        <div className="post-head">
          <div className="nickname">{post.nickname}</div>
          <div className="register-time">{post.registered}</div>
        </div>
        <div className="hospital-name">{post.hospitalName}</div>
        <div className="swiper-layout">
          <DoSwiper source={post.images} />
        </div>
        <div className="post-comment">
          <div
            className={!isShowMoreClicked && isCommentOver3Line ? "hide" : ""}
            ref={commentRef}
          >
            {post.review}
          </div>
          {showMoreRender()}
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
