import React, { FC, ReactNode } from "react";

import Button from "../../Button";
import styled from "@emotion/styled";
import { DIRECTION } from "@/types/common";

interface IFloatProps {
  scrollDir?: DIRECTION | undefined;
  distance: string;
  icon?: ReactNode;
}

const Float: FC<IFloatProps> = ({ scrollDir, distance, icon }) => {
  return (
    <FloatWrapper direction={scrollDir} distance={distance}>
      {icon}
      {/* <Button iconName="pen" text={text} onClick={onClick} /> */}
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
  z-index: 3;
  transition: all 0.3s linear;
  transform: ${(props) => {
    if (!props.direction) {
      return;
    }
    return props.direction === DIRECTION.Up ? "" : "translateY(20rem)";
  }};
`;
