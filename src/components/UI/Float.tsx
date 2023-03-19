import React, { FC } from "react";

import Button from "../Button";
import styled from "@emotion/styled";
import { DIRECTION } from "@/types/common";

interface IFloatProps {
  scrollDir: DIRECTION | undefined;
  distance: string;
  onClick: () => void;
}

const Float: FC<IFloatProps> = ({ scrollDir, distance, onClick }) => {
  return (
    <FloatWrapper direction={scrollDir} distance={distance}>
      <Button iconName="pen" text="후기 또는 질문 쓰기" onClick={onClick} />
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
