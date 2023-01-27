import React, { FC } from "react";
import { modalContentState, modalState } from "@/components/Modal/store";
import { useResetRecoilState, useSetRecoilState } from "recoil";

import WriteQuesiton from "../Question";
import WriteReview from ".";
import { createReviewState } from "./store";

interface IModalFactoryProps {
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  modalType: string;
  setModalType: (val: string) => void;
}
const ModalFactory: FC<IModalFactoryProps> = ({
  isActive,
  setIsActive,
  modalType,
  setModalType,
}) => {
  const setModalIsActive = useSetRecoilState(modalState);
  const setModalContent = useSetRecoilState(modalContentState);
  const resetReviewState = useResetRecoilState(createReviewState);

  const handleClose = () => {
    setIsActive(false);
  };

  const onSwapModalType = () => {
    setIsActive(false);
    setModalType("question");
    setIsActive(true);
  };

  const changeActiveHandler = () => {
    setModalContent({
      title: "후기 작성을 취소하시겠어요?",
      content: `
      작성을 취소할 경우 지금까지 입력한 내용이 모두 사라집니다.`,
      actionLeft: {
        text: "작성 취소",
        action: () => {
          resetReviewState();
          setIsActive(false);
          setModalIsActive({ isActive: false });
        },
      },
      actionRight: {
        text: "계속 작성",
        action: () => {
          setModalIsActive({ isActive: false });
        },
      },
    });
    setModalIsActive((prev) => ({
      action: () => {
        setModalIsActive((prev) => ({ ...prev, isActive: false }));
      },
      isActive: true,
    }));
  };

  return (
    <>
      {modalType === "question" ? (
        <WriteQuesiton
          isActive={isActive}
          onClose={handleClose}
          onChangeActive={changeActiveHandler}
        />
      ) : (
        <WriteReview
          onSwap={onSwapModalType}
          isActive={isActive}
          onClose={handleClose}
          onChangeActive={changeActiveHandler}
        />
      )}
    </>
  );
};

export default ModalFactory;
