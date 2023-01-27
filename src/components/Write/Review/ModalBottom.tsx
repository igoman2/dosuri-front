import { Dispatch, FC } from "react";

import Button from "@/components/Button";
import styled from "@emotion/styled";
import { useTheme } from "@emotion/react";

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

  return (
    <ButtonWrapper>
      {mode === 0 && (
        <div className="top">
          <Button
            text="치료후기 말고 질문/상담 글 쓰러 가기"
            backgroundColor={theme.colors.white}
            color={theme.colors.purple}
            bold
            css={{ marginBottom: "3.5rem" }}
            onClick={onSwap}
          />
        </div>
      )}
      <div className="bottom">
        <Button
          css={{ visibility: mode === 0 ? "hidden" : "visible" }}
          bold
          borderRadius="0.3rem"
          text="이전"
          width="50%"
          backgroundColor={theme.colors.white}
          color={theme.colors.purple}
          border={`0.1rem solid ${theme.colors.purple}`}
          onClick={() => {
            setMode((prev) => prev - 1);
          }}
        />
        <Button
          bold
          borderRadius="0.3rem"
          text="다음"
          width="50%"
          type="submit"
          backgroundColor={theme.colors.purple_light}
          onClick={() => (action ? action() : setMode((prev) => prev + 1))}
          disabled={disabled}
        />
      </div>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  .top {
    display: flex;
    justify-content: center;
  }

  .bottom {
    display: flex;
    gap: 4rem;
    justify-content: right;
  }
`;
