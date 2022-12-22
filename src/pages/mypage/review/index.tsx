import { Post, posts } from "@/mock/posts";
import React, { useEffect, useState } from "react";

import Float from "@/components/UI/Float";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostCard from "@/components/Card/PostCard";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";

export const DIRECTION = {
  Up: "UP",
  Down: "Down",
} as const;
export type DIRECTION = typeof DIRECTION[keyof typeof DIRECTION]; // 'UP' | DOWN'

const Review = () => {
  const [scrollDir] = useDirection();

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
    <Layout header={<HeaderDepth />} footer={false}>
      <>
        <ReviewWrapper>
          <div className="sub-title">내 후기 총 2개</div>

          {/* {posts.map((post, i) => (
            <Link href={`review/${post.id}`} key={i}>
              <a>
                <PostCard post={post} bottom={renderPostBottom(post)} />
              </a>
            </Link>
          ))} */}
        </ReviewWrapper>

        <Float scrollDir={scrollDir} distance="1.5rem" />
      </>
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
`;

const PostBottom = styled.div`
  .post-bottom {
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
