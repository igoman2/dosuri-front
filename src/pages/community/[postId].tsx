import React, { FC } from "react";

import Comment from "@/components/Comment";
import CommentProvider from "@/store/context/Comment";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import PostCard from "@/components/Card/PostCard";
import Reply from "@/components/Community/Reply";
import { getCommunityPostDetail } from "@/service/apis/community";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

interface IPostProps {
  postId: string;
}

const Post: FC<IPostProps> = ({ postId }) => {
  const { data } = useQuery("getCommunityPostDetail", () =>
    getCommunityPostDetail(postId)
  );

  if (!data) {
    return null;
  }

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
      <CommentProvider>
        <PostCard review={data} bottom={renderPostBottom()} />
        <Comment comments={data.article_comment} />
        <Reply postId={postId} />
      </CommentProvider>
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

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { postId } = query;
  return {
    props: {
      postId,
    },
  };
};
