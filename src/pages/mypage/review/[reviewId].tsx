import React, { FC } from "react";
import { modalContentState, modalState } from "@/components/Modal/store";

import Button from "@/components/Button";
import Comment from "@/components/domain/Community/Comment";
import CommentProvider from "@/store/context/Comment";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import Reply from "@/components/domain/Community/Reply";
import { getCommunityPostDetail } from "@/service/apis/community";
import { queryClient } from "@/service/react-query/queryClient";
import { queryKeys } from "@/service/react-query/constants";
import { useDeleteMyReview } from "@/hooks/service/useDeleteMyReview";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

interface IReviewDetailProps {
  reviewId: string;
}

const ReviewDetail: FC<IReviewDetailProps> = ({ reviewId }) => {
  const theme = useTheme();
  const router = useRouter();
  const [_, setIsActive] = useRecoilState(modalState);
  const [__, setModalContent] = useRecoilState(modalContentState);

  const { data } = useQuery(["getMyReviewDetail", reviewId], () =>
    getCommunityPostDetail(reviewId)
  );

  const { mutate } = useDeleteMyReview();

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
          mutate(reviewId, {
            onSuccess: () => {
              queryClient.invalidateQueries({
                queryKey: [queryKeys.community],
                refetchInactive: true,
              });
              setIsActive((prev) => {
                return { ...prev, isActive: false };
              });
              router.replace("/mypage/review");
            },
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
      <NextSeo title="마이페이지 | 도수리-도수치료 리얼후기" />

      <CommentProvider>
        <PostCard
          review={data}
          skip={false}
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
