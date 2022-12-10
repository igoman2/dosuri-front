import React, { FC } from "react";

import Image from "next/image";
import styled from "@emotion/styled";

interface ICustomImageProps {
  src: string;
}

const CustomImage: FC<ICustomImageProps> = ({ src }) => {
  return (
    <ImageWrapper>
      <Img src={src} layout="fill" alt="hospital-thumbnail" />
    </ImageWrapper>
  );
};

export default CustomImage;

const ImageWrapper = styled.div`
  width: 100%;
  top: -6rem;
  z-index: 10;

  & > span {
    position: unset !important;
  }
`;

const Img = styled(Image)`
  height: auto !important;
  position: relative !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;
