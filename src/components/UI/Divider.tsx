import styled from "@emotion/styled";
import React, { FC } from "react";

interface IDivideProps {
  height: number;
}

const Divider: FC<IDivideProps> = ({ height }) => {
  return <DividerWrapper height={height} />;
};

export default Divider;

const DividerWrapper = styled.div<IDivideProps>`
  height: ${(props) => `${props.height}px`};
  background-color: black;
  opacity: 0.1;
  margin-left: calc(-50vw + 50%);
  width: 100vw;
`;
