import { css, useTheme } from "@emotion/react";
import React, { FC, ReactElement } from "react";

interface IButtonProps {
  text: string | ReactElement;
  size?: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  border?: string;
  onClick?: () => void;
}

const Button: FC<IButtonProps> = ({
  text,
  size,
  color,
  backgroundColor,
  border,
  onClick,
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
    outline: 0;
    cursor: pointer;
  `;

  return (
    <button css={button} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
