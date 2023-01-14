import React, { FC } from "react";

import Comment from "@/components/Comment";
import CommentProvider from "@/store/context/Comment";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import Reply from "@/components/Community/Reply";
import { getCommunityPostDetail } from "@/service/apis/community";
import { useQuery } from "react-query";

interface IPostProps {
  postId: string;
}

const Post: FC<IPostProps> = ({ postId }) => {
  const { data } = useQuery(["getCommunityPostDetail", postId], () =>
    getCommunityPostDetail(postId)
  );

  if (!data) {
    return null;
  }

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <CommentProvider>
        <PostCard
          review={data}
          bottom={<PostBottom review={data} type="detail" />}
        />
        <Comment comments={data.article_comment} />
        <Reply postId={postId} />
      </CommentProvider>
    </Layout>
  );
};

export default Post;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { postId } = query;
  return {
    props: {
      postId,
    },
  };
};
