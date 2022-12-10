import { Post, posts } from "@/mock/posts";
import { modalContentState, modalState } from "@/components/Modal/store";

import Button from "@/components/Button";
import Comment from "@/components/Comment";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import PostCard from "@/components/Card/PostCard";
import React from "react";
import { comment } from "@/mock/comment";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { useTheme } from "@emotion/react";

const ReviewDetail = () => {
  const theme = useTheme();

  const [_, setIsActive] = useRecoilState(modalState);
  const [__, setModalContent] = useRecoilState(modalContentState);

  const renderPostBottom = (post: Post) => {
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
      <>
        {[posts[0]].map((post, i) => (
          <PostCard post={post} key={i} bottom={renderPostBottom(post)} />
        ))}
        <Comment comment={comment} />
      </>
    </Layout>
  );
};

export default ReviewDetail;

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
