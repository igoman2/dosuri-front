import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import React from "react";
import PostCard from "@/components/Card/PostCard";
import Comment from "@/components/Comment";
import { comment } from "@/mock/comment";
import styled from "@emotion/styled";
import Icon from "@/util/Icon";
import { posts } from "@/mock/posts";

const Post = () => {
  const renderPostBottom = () => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="20" height="20" />
            <span>좋아요</span>
          </div>
        </div>
      </PostBottom>
    );
  };

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <>
        {[posts[0]].map((post, i) => (
          <PostCard post={post} key={i} bottom={renderPostBottom()} />
        ))}
        <Comment comment={comment} />
      </>
    </Layout>
  );
};

export default Post;

const PostBottom = styled.div`
  .post-bottom {
    display: flex;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    color: ${(props) => props.theme.colors.grey};

    .heart {
      display: flex;
      gap: 0.6rem;
      align-items: center;
    }
  }
`;
