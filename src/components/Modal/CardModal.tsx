import React from "react";
import Button from "@/components/Button";
import { css, useTheme } from "@emotion/react";

export type CardModalProps = {
  active: boolean;
  closeEvent: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  title: string;
  children: React.ReactNode;
  actionMsg: string;
  actionEvent?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

const CardModal = ({
  closeEvent,
  title,
  children,
  actionMsg,
  actionEvent,
}: CardModalProps) => {
  const theme = useTheme();

  const modal = css`
    .title-layout {
      display: flex;
      justify-content: center;
    }

    .title {
      font-size: ${theme.fontSizes.lg};
      line-height: ${theme.lineHeights.lg};
      font-weight: 700;
    }

    .msg {
      font-size: ${theme.fontSizes.md};
      line-height: ${theme.lineHeights.md};
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
        font-size: ${theme.fontSizes.md};
        line-height: ${theme.lineHeights.md};
        font-weight: 700;
      }
    }
  `;
  return (
    <div css={modal}>
      <div className="title-layout">
        <span className="title">{title}</span>
      </div>

      <div className="msg">{children}</div>
      <div className="action_box">
        <Button
          text="취소"
          onClick={closeEvent}
          color={theme.colors.black}
          backgroundColor={theme.colors.grey_light}
        />
        <Button text="삭제하기" backgroundColor={theme.colors.red} />
      </div>
    </div>
  );
};

CardModal.defaultProps = {
  active: false,
};

export default CardModal;
