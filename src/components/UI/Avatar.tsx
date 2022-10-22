import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC } from "react";

interface IAvatarProps {
  src: string;
  width?: number;
  height?: number;
}
const Avatar: FC<IAvatarProps> = ({ src, width, height }) => {
  return (
    <ImageWrapper>
      <Image
        style={{
          borderRadius: "50%",
        }}
        width={width}
        height={height}
        src={src}
        alt="avatar"
      />
    </ImageWrapper>
  );
};

export default Avatar;

const ImageWrapper = styled.span`
  span {
    border-radius: 50%;

    img {
      border: 1px solid ${(props) => props.theme.colors.grey_light} !important;
    }
  }
`;
