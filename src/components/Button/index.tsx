import { css, useTheme } from "@emotion/react";
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
}

const Button: FC<IButtonProps> = ({
  text,
  color,
  backgroundColor,
  border,
  onClick,
  type,
  width,
  disabled,
}) => {
  const theme = useTheme();
  const button = css`
    font-size: ${theme.fontSizes.lg};
    line-height: ${theme.lineHeights.lg};
    color: ${color ? color : theme.colors.white};
    background-color: ${backgroundColor
      ? backgroundColor
      : theme.colors.purple_light2};
    min-height: 4.2rem;
    padding: 1rem;
    box-shadow: none;
    border-radius: 0.5rem;
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
    <button css={button} onClick={onClick} type={type} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
