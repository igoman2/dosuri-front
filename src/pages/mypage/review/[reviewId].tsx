import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import React from "react";
import { Post, posts } from "@/mock/posts";
import PostCard from "@/components/Card/PostCard";
import Comment from "@/components/Comment";
import { comment } from "@/mock/comment";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import { useRecoilState } from "recoil";
import { modalState } from "@/components/Layout/store";
import ModalBase from "@/components/Modal/ModalBase";
import CardModal from "@/components/Modal/CardModal";
import styled from "@emotion/styled";
import Icon from "@/util/Icon";

const ReviewDetail = () => {
  const theme = useTheme();

  const [isActive, setIsActive] = useRecoilState(modalState);

  const onClickModalOff = () => {
    setIsActive(false);
  };

  const onClickCardRemove = () => {
    alert("이벤트 실행");
  };

  const onDeleteHander = () => {
    setIsActive(true);
  };

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

  return (
    <Layout
      header={
        <HeaderDepth
          left={
            <Button
              text="삭제"
              onClick={onDeleteHander}
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
      <ModalBase active={isActive} closeEvent={onClickModalOff}>
        <CardModal
          closeEvent={onClickModalOff}
          title="내 후기 삭제하기"
          actionMsg="삭제"
          actionEvent={onClickCardRemove}
        >
          후기의 내용과 댓글이 모두 삭제되며, 삭제한 후기는 복구할 수 없습니다.
          정말로 삭제하시겠어요?
          <br />
          삭제한 초대장은 복구 할 수 없습니다.
        </CardModal>
      </ModalBase>
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
