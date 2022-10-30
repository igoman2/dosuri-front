import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import React, { FC, ReactElement } from "react";

interface ImageTextViewProps {
  image: ReactElement;
  text: string;
}

const ImageTextView: FC<ImageTextViewProps> = ({ image, text }) => {
  return (
    <ImageTextViewWrapper>
      <span>{text}</span>
      {image}
    </ImageTextViewWrapper>
  );
};

export default ImageTextView;

const ImageTextViewWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey_light};
  border-radius: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.sm};
  line-height: ${(props) => props.theme.lineHeights.sm};
  cursor: pointer;
`;
