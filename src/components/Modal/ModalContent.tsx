import { useTheme } from "@emotion/react";
import { modalContentState } from "./store";

import Button from "@/components/Button";
import React from "react";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import QRCode from "@/public/assets/app-qr.png";

import Image from "next/image";

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
        {modalContent.actionCancel.text && (
          <Button
            text={modalContent.actionCancel.text}
            onClick={modalContent.actionCancel.action}
            color={theme.colors.black}
            backgroundColor={theme.colors.grey_light}
          />
        )}
        {modalContent.actionConfirm.text && (
          <Button
            text={modalContent.actionConfirm.text}
            backgroundColor={theme.colors.purple}
            onClick={modalContent.actionConfirm.action}
          />
        )}

        {modalContent.actionWarn.text && (
          <Button
            text={modalContent.actionWarn.text}
            backgroundColor={theme.colors.red}
            onClick={modalContent.actionWarn.action}
          />
        )}

        {modalContent.qr && (
          <div className="action_box">
            <div className="qr">
              {modalContent.qr.text}
              <Image
                src={QRCode}
                width={modalContent.qr.qrValues.size}
                height={modalContent.qr.qrValues.size}
                alt="app-qrcode"
              />
            </div>
          </div>
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
    margin: 2rem 0 1.5rem 0;
  }

  .action_box {
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    flex-grow: 1;
    gap: 2rem;
    width: 100%;
    button {
      width: 100%;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      font-weight: 700;
      margin-top: 1.5rem;
    }

    .qr {
      display: flex;
      flex-direction: column;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      color: ${(props) => props.theme.colors.purple_light};
      justify-content: center;
      align-items: center;
      gap: 0.3rem;
    }
  }
`;
