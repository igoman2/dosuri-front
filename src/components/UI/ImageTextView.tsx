import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import React, { FC, ReactElement } from "react";

interface ImageTextViewProps {
  image: ReactElement;
  text: string;
  reverse?: boolean;
  border?: boolean;
  color?: string;
}

const ImageTextView: FC<ImageTextViewProps> = ({
  image,
  text,
  reverse,
  color,
  border,
}) => {
  return (
    <ImageTextViewWrapper border={border} color={color}>
      {reverse ? (
        <div className="wrapper">
          <div className="image">{image}</div>

          <span>{text}</span>
        </div>
      ) : (
        <div className="wrapper">
          <span>{text}</span>
          <div className="image">{image}</div>
        </div>
      )}
    </ImageTextViewWrapper>
  );
};

export default ImageTextView;

interface ImageTextViewWrapperProps {
  border?: boolean;
}

const ImageTextViewWrapper = styled.div<ImageTextViewWrapperProps>`
  .wrapper {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.2rem;
    padding: 0.5rem 1rem;
    border: ${(props) =>
      props.border ? `1px solid ${props.theme.colors.grey_light}` : ""};
    border-radius: 0.5rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    cursor: pointer;
    color: ${(props) => props.color};
  }
`;
