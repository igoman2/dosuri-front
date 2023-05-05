import React, { FC } from "react";
import {
  closeModalDirectionState,
  modalContentState,
  modalState,
} from "@/components/Modal/store";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";

import WriteQuesiton from "../Question";
import WriteReview from ".";
import { createReviewState } from "./store";

interface IModalFactoryProps {
  isActive: boolean;
  setIsActive: (val: boolean) => void;
  modalType: "question" | "review";
  setModalType: (val: "question" | "review") => void;
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

  const [closeModalDirection, setCloseModalDirection] = useRecoilState(
    closeModalDirectionState
  );

  const handleClose = () => {
    setIsActive(false);
  };

  const changeActiveHandler = () => {
    setModalContent({
      title: "후기 작성을 취소하시겠어요?",
      content: `
      작성을 취소할 경우 지금까지 입력한 내용이 모두 사라집니다.`,
      actionCancel: {
        text: "작성 취소",
        action: () => {
          resetReviewState();
          setIsActive(false);
          setModalIsActive({ isActive: false });
        },
      },
      actionWarn: {
        text: "계속 작성",
        action: () => {
          setModalIsActive({ isActive: false });
        },
      },
      actionConfirm: {
        text: "",
        action: () => {},
      },
    });
    setModalIsActive((prev) => ({
      action: () => {
        setModalIsActive((prev) => ({ ...prev, isActive: false }));
      },
      isActive: true,
    }));
    if (closeModalDirection.direction === "DOWN") {
      setCloseModalDirection({ direction: "UP" });
    }
  };

  return (
    <>
      {modalType === "question" ? (
        <WriteQuesiton
          isActive={isActive}
          onClose={handleClose}
          onChangeActive={changeActiveHandler}
          onSwap={() => {
            setIsActive(false);
            setModalType("review");
            setIsActive(true);
          }}
        />
      ) : (
        <WriteReview
          onSwap={() => {
            setIsActive(false);
            setModalType("question");
            setIsActive(true);
          }}
          isActive={isActive}
          onClose={handleClose}
          onChangeActive={changeActiveHandler}
        />
      )}
    </>
  );
};

export default ModalFactory;
