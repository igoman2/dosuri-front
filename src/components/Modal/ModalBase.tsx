import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ModalContent from "./ModalContent";
import { useRecoilState } from "recoil";
import { modalState } from "./store";

const ModalBase = () => {
  const [closed, setClosed] = useState(true);
  const [modal, setModal] = useRecoilState(modalState);
  useEffect(() => {
    document.body.style.overflowY = modal.isActive ? "hidden" : "initial";

    let timeoutId: any;
    if (modal.isActive) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [modal.isActive]);

  useEffect(() => {
    return () => {
      document.body.style.overflowY = "initial";
    };
  }, []);

  if (!modal.isActive && closed) return null;

  return (
    <>
      <ModalBaseContainer active={modal.isActive}>
        <div
          className="modal_back"
          onClick={() => {
            setModal(() => {
              return { isActive: false, action: () => {} };
            });
          }}
        />
        <div className="modal_content">
          <ModalContent />
        </div>
      </ModalBaseContainer>
    </>
  );
};

export const ModalBaseContainer = styled.div<{ active: boolean }>`
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  .modal_back {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal_content {
    position: relative;
    z-index: 10;
    max-width: 40rem;
    width: 100%;
    background-color: ${(props) => props.theme.colors.white};
    margin: 2rem;
    padding: 2rem;
    border-radius: 1.5rem;
    overflow: hidden;
    ${(props) =>
      props.active
        ? css`
            animation: popInFromBottom 0.4s forwards ease-in-out;
          `
        : css`
            animation: popOutToBottom 0.4s forwards ease-in-out;
          `}
  }
  @keyframes popInFromBottom {
    0% {
      opacity: 0;
      transform: translateY(40rem) scale(0.75);
    }
    75% {
      opacity: 1;
      transform: translateY(-1.6rem) scale(1);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes popOutToBottom {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(40rem) scale(0.75);
    }
  }
`;

export default ModalBase;
