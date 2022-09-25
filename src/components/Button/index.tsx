import styled from "@emotion/styled";
import React, { FC } from "react";

interface IButtonProps {
  text: string;
}

const Button: FC<IButtonProps> = ({ text }) => {
  return <ButtonWrapper>{text}</ButtonWrapper>;
};

const ButtonWrapper = styled.button`
  font-size: ${(props) => props.theme.fontSizes.xxxl};
`;

export default Button;
