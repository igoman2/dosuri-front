import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import React from "react";
import { reviews } from "@/mock/reviews";
import ReviewCard from "@/components/Card/ReviewCard";
import Comment from "@/components/Comment";
import { comment } from "@/mock/comment";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import { useRecoilState } from "recoil";
import { modalState } from "@/components/Layout/store";
import ModalBase from "@/components/Modal/ModalBase";
import CardModal from "@/components/Modal/CardModal";

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
        {[reviews[0]].map((review, i) => (
          <ReviewCard review={review} key={i} />
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
