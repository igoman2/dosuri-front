import React, { FC } from "react";

import Button from "../Button";
import { DIRECTION } from "@/pages/mypage/review";
import styled from "@emotion/styled";

interface IFloatProps {
  scrollDir: DIRECTION | undefined;
  distance: string;
}

const Float: FC<IFloatProps> = ({ scrollDir, distance }) => {
  return (
    <FloatWrapper direction={scrollDir} distance={distance}>
      <Button iconName="pen" text="후기 또는 질문 쓰기" />
    </FloatWrapper>
  );
};

export default Float;

interface FloatProps {
  direction: DIRECTION | undefined;
  distance: string;
}

const FloatWrapper = styled.div<FloatProps>`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: ${(props) => props.distance};
  left: 0;
  right: 0;
  z-index: 10;
  transition: all 0.3s linear;
  transform: ${(props) => {
    if (!props.direction) {
      return;
    }
    return props.direction === DIRECTION.Up ? "" : "translateY(20rem)";
  }};
`;
