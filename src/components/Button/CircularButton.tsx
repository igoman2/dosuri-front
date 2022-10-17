import Icon from "@/util/Icon";
import { css, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import React, { FC, ReactElement } from "react";

interface IButtonProps {
  text: string | ReactElement;
  color?: string;
  backgroundColor?: string;
  border?: string;
  width?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  iconName: string;
}

const CircularButton: FC<IButtonProps> = ({
  text,
  color,
  backgroundColor,
  border,
  onClick,
  type,
  width,
  disabled,
  iconName,
}) => {
  const theme = useTheme();
  const button = css`
    font-size: ${theme.fontSizes.md};
    line-height: ${theme.lineHeights.md};
    color: ${color ? color : theme.colors.white};
    background-color: ${backgroundColor
      ? backgroundColor
      : theme.colors.purple_light2};
    padding: 1rem;
    box-shadow: none;
    border-radius: 4rem;
    border: ${border ? border : 0};
    width: ${width ? width : "auto"};
    outline: 0;
    cursor: pointer;

    &:disabled {
      background-color: ${theme.colors.grey};
      color: ${theme.colors.white};
    }
  `;

  return (
    <ButtonWrapper>
      <button css={button} onClick={onClick} type={type} disabled={disabled}>
        <Icon name={iconName} />
        <span className="text">{text}</span>
      </button>
    </ButtonWrapper>
  );
};

export default CircularButton;

const ButtonWrapper = styled.div`
  button {
    padding: 0.9rem 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;

    .text {
      padding-top: 0.2rem;
    }
  }
`;
