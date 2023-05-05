import { FC } from "react";
import styled from "@emotion/styled";

interface AddressDividerProps {
  height: number;
  marginLeft?: number;
  marginRight?: number;
}

const AddressDivider: FC<AddressDividerProps> = ({
  height,
  marginLeft,
  marginRight,
}) => {
  return (
    <DividerWrapper
      height={height}
      marginLeft={marginLeft}
      marginRight={marginRight}
    />
  );
};

export default AddressDivider;

const DividerWrapper = styled.div<AddressDividerProps>`
  border-bottom: ${(props) => `${props.height}px solid lightGrey`};
  margin-left: ${(props) =>
    props.marginLeft ? `${props.marginLeft}rem` : null};
  margin-right: ${(props) =>
    props.marginRight ? `${props.marginRight}rem` : null};
`;
