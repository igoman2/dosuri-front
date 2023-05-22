import React, { FC } from "react";

import Button from "../../Button";
import styled from "@emotion/styled";
import { DIRECTION } from "@/types/common";

interface IFloatProps {
  scrollDir: DIRECTION | undefined;
  distance: string;
  text: string;
  iconName: string;
  onClick: () => void;
}

const FloatButton: FC<IFloatProps> = ({
  scrollDir,
  distance,
  onClick,
  iconName,
  text,
}) => {
  return (
    <FloatWrapper direction={scrollDir} distance={distance}>
      <Button iconName={iconName} text={text} onClick={onClick} />
    </FloatWrapper>
  );
};

export default FloatButton;

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
