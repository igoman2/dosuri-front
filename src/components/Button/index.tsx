import Icon, { IconName } from "@/util/Icon";
import React, { FC, ReactNode } from "react";
import { css, useTheme } from "@emotion/react";

import styled from "@emotion/styled";

interface IButtonProps {
  text: string | ReactNode;
  color?: string;
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  iconName?: IconName;
  bold?: boolean;
  fontSize?: "xxxl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
  dense?: boolean;
  padding?: string;
  shadow?: boolean;
}

const Button: FC<IButtonProps> = ({
  text,
  color,
  backgroundColor,
  border,
  borderRadius,
  onClick,
  type,
  width,
  height,
  disabled,
  iconName,
  bold,
  dense,
  padding,
  fontSize,
  shadow,
  ...props
}) => {
  const theme = useTheme();
  const button = css`
    font-size: ${fontSize
      ? theme.fontSizes[fontSize]
      : iconName
      ? theme.fontSizes.md
      : theme.fontSizes.lg};
    line-height: ${fontSize
      ? theme.lineHeights[fontSize]
      : iconName
      ? theme.lineHeights.md
      : theme.lineHeights.lg};
    color: ${color ? color : theme.colors.white};
    background-color: ${backgroundColor
      ? backgroundColor
      : theme.colors.purple_light2};
    padding: ${padding ? padding : dense ? "0.5rem" : "1rem"};
    box-shadow: ${shadow ? `0px 1px 4px 0px rgba(0, 0, 0, 0.25)` : "none"};
    border-radius: ${borderRadius
      ? borderRadius
      : iconName
      ? "4rem"
      : "0.5rem"};
    border: ${border ? border : 0};
    width: ${width ? width : "auto"};
    height: ${height ? height : "auto"};
    outline: 0;
    cursor: pointer;
    font-weight: ${bold ? 700 : 400};

    &:disabled {
      background-color: ${theme.colors.grey};
      color: ${theme.colors.white};
    }
  `;

  return (
    <>
      {iconName ? (
        <ButtonWrapper>
          <button
            css={button}
            onClick={onClick}
            type={type}
            disabled={disabled}
            {...props}
          >
            <Icon name={iconName} />
            <span className="text">{text}</span>
          </button>
        </ButtonWrapper>
      ) : (
        <button
          css={button}
          onClick={onClick}
          type={type}
          disabled={disabled}
          {...props}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;

const ButtonWrapper = styled.div`
  button {
    padding: 1rem 2rem;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
`;
