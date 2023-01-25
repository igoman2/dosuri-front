import { css, useTheme } from "@emotion/react";
import { modalContentState, modalState } from "./store";

import Button from "@/components/Button";
import React from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";

const ModalContent = () => {
  const theme = useTheme();
  const [modalContent, setModalContent] = useRecoilState(modalContentState);

  return (
    <ModalWrapper>
      <div className="title-layout">
        <span className="title">{modalContent.title}</span>
      </div>

      <div className="msg">{modalContent.content}</div>
      <div className="action_box">
        {modalContent.actionLeft.text && (
          <Button
            text={modalContent.actionLeft.text}
            onClick={modalContent.actionLeft.action}
            color={theme.colors.black}
            backgroundColor={theme.colors.grey_light}
          />
        )}
        {modalContent.actionRight.text && (
          <Button
            text={modalContent.actionRight.text}
            backgroundColor={theme.colors.red}
            onClick={modalContent.actionRight.action}
          />
        )}
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
