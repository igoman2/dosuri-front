import { Dispatch, FC } from "react";
import { css, useTheme } from "@emotion/react";

import Button from "@/components/Button";
import styled from "@emotion/styled";

interface IModalBottomProps {
  mode: number;
  setMode: Dispatch<React.SetStateAction<number>>;
  onSwap: () => void;
  disabled: boolean;
  action?: () => void;
}
export const ModalBottom: FC<IModalBottomProps> = ({
  mode,
  setMode,
  onSwap,
  disabled,
  action,
}) => {
  const theme = useTheme();
  const button = css`
    width: 16rem;
    font-weight: 700;
    color: ${theme.colors.purple};
    background-color: ${theme.colors.white};
    font-size: ${theme.fontSizes.lg};
    line-height: ${theme.lineHeights.lg};
    box-shadow: none;
    border: none;
    outline: 0;
    cursor: pointer;
  `;

  return (
    <ButtonWrapper>
      {mode === 0 ? (
        <button css={button} onClick={onSwap}>
          <div>치료후기 말고</div>
          <div>질문/상담 글 쓰러 가기</div>
        </button>
      ) : (
        <Button
          css={{ visibility: mode === 0 ? "hidden" : "visible" }}
          bold
          borderRadius="0.3rem"
          height="5.2rem"
          text="이전"
          width="14rem"
          backgroundColor={theme.colors.white}
          color={theme.colors.purple}
          border={`0.1rem solid ${theme.colors.purple}`}
          onClick={() => {
            setMode((prev) => prev - 1);
          }}
        />
      )}

      <Button
        bold
        borderRadius="0.3rem"
        height="5.2rem"
        text="다음"
        type="submit"
        width="14rem"
        backgroundColor={theme.colors.purple_light}
        onClick={() => (action ? action() : setMode((prev) => prev + 1))}
        disabled={disabled}
      />
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
