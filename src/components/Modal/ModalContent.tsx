import React from "react";
import Button from "@/components/Button";
import { css, useTheme } from "@emotion/react";
import { useRecoilState } from "recoil";
import styled from "@emotion/styled";
import { modalContentState, modalState } from "./store";

const ModalContent = () => {
  const theme = useTheme();
  const [modal, setModal] = useRecoilState(modalState);
  const [modalContent, setModalContent] = useRecoilState(modalContentState);

  const onModalAction = () => {
    modal.action();
  };

  return (
    <ModalWrapper>
      <div className="title-layout">
        <span className="title">{modalContent.title}</span>
      </div>

      <div className="msg">{modalContent.content}</div>
      <div className="action_box">
        <Button
          text="취소"
          onClick={() => {
            setModal((prev) => {
              return { ...prev, isActive: false };
            });
          }}
          color={theme.colors.black}
          backgroundColor={theme.colors.grey_light}
        />
        <Button
          text={modalContent.actionString}
          backgroundColor={theme.colors.red}
          onClick={onModalAction}
        />
      </div>
    </ModalWrapper>
  );
};

export default ModalContent;

const ModalWrapper = styled.div`
  .title-layout {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 700;
  }

  .msg {
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    margin: 2rem 0 3rem 0;
    white-space: pre-wrap;
  }

  .action_box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-grow: 1;
    gap: 2rem;
    button {
      width: 100%;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      font-weight: 700;
    }
  }
`;
