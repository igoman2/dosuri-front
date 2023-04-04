import Reply from "@/components/pages/Community/Reply";
import PageModal from "@/components/Modal/PageModal";
import { getCommunityPostDetail } from "@/service/apis/community";
import CommentProvider from "@/store/context/Comment";
import React, { FC } from "react";
import { useQuery } from "react-query";
import PostCard from ".";
import PostBottom from "./PostBottom";
import Comment from "@/components/pages/Community/Comment";

interface IModalPostCardProps {
  postId: string;
}

const ModalPostCard: FC<IModalPostCardProps> = ({ postId }) => {
  const { data } = useQuery(["getCommunityPostDetail", postId], () =>
    getCommunityPostDetail(postId)
  );

  if (!data) {
    return null;
  }

  return (
    <PageModal>
      <CommentProvider>
        <PostCard
          review={data}
          bottom={<PostBottom review={data} type="detail" />}
          skip={false}
        />
        <Comment comments={data.article_comment} />
        <Reply postId={postId} />
      </CommentProvider>
    </PageModal>
  );
};

export default ModalPostCard;
