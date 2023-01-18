import React, { FC } from "react";
import { modalContentState, modalState } from "@/components/Modal/store";

import Button from "@/components/Button";
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
import { useRecoilState } from "recoil";
import { useTheme } from "@emotion/react";

interface IReviewDetailProps {
  reviewId: string;
}

const ReviewDetail: FC<IReviewDetailProps> = ({ reviewId }) => {
  const theme = useTheme();

  const [_, setIsActive] = useRecoilState(modalState);
  const [__, setModalContent] = useRecoilState(modalContentState);

  const { data } = useQuery(["getMyReviewDetail", reviewId], () =>
    getCommunityPostDetail(reviewId)
  );

  if (!data) {
    return null;
  }

  const onReviewDelete = () => {
    setModalContent({
      title: "내 후기 삭제하기",
      content: `
      후기의 내용과 댓글이 모두 삭제되며, 삭제한 후기는 복구할 수
      없습니다. 정말로 삭제하시겠어요?
      삭제한 초대장은 복구 할 수 없습니다.`,
      actionLeft: {
        text: "취소",
        action: () => {
          setIsActive((prev) => {
            return { ...prev, isActive: false };
          });
        },
      },
      actionRight: {
        text: "삭제",
        action: () => {
          console.log("삭제!");
          setIsActive((prev) => {
            return { ...prev, isActive: false };
          });
        },
      },
    });

    setIsActive((prev) => {
      return { ...prev, isActive: true };
    });
  };
  return (
    <Layout
      header={
        <HeaderDepth
          left={
            <Button
              text="삭제"
              onClick={onReviewDelete}
              color={theme.colors.red_light}
              backgroundColor={theme.colors.white}
              fontSize="md"
              bold
            />
          }
        />
      }
      footer={false}
    >
      <CommentProvider>
        <PostCard
          review={data}
          bottom={<PostBottom review={data} type="detail" />}
        />
        <Comment comments={data.article_comment} />
        <Reply postId={reviewId} />
      </CommentProvider>
    </Layout>
  );
};

export default ReviewDetail;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { reviewId } = query;
  return {
    props: {
      reviewId,
    },
  };
};
