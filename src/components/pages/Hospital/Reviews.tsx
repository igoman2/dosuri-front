import PostCard from "@/components/Card/PostCard";
import PostBottom from "@/components/UI/emotion/PostBottom";
import { Post, posts } from "@/mock/posts";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import React from "react";

const Reviews = () => {
  const renderPostBottom = (post: Post) => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="17" height="17" />
            <span>{post.heart}</span>
          </div>
          <div className="comment">
            <Icon name="comment" />
            <span>{post.comment}</span>
          </div>
        </div>
      </PostBottom>
    );
  };
  return (
    <ReviewsWrapper>
      <div className="title">
        후기
        <span className="list-length"> 30</span>건
      </div>
      {posts.map((post, i) => (
        <PostCard post={post} key={i} bottom={renderPostBottom(post)} />
      ))}
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