import React, { FC, useState } from "react";

import Icon from "@/util/Icon";
import styled from "@emotion/styled";

interface ICheckboxProps {
  text: string;
}

const Checkbox: FC<ICheckboxProps> = ({ text }) => {
  const [isChecked, setIsChecked] = useState(false);

  const onCheckToggle = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <CheckBoxLayout>
      <CheckBoxWrapper isChecked={isChecked} onClick={onCheckToggle}>
        <Icon name="check" />
      </CheckBoxWrapper>
      <div className="checkbox-label">{text}</div>
    </CheckBoxLayout>
  );
};

export default Checkbox;

interface Props {
  isChecked: boolean;
}

const CheckBoxLayout = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  .checkbox-label {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }
`;

const CheckBoxWrapper = styled.div<Props>`
  border-radius: 0.2rem;
  cursor: pointer;
  background-color: ${(props) =>
    props.isChecked ? props.theme.colors.purple : ""};
  border: ${(props) =>
    props.isChecked ? "" : `1px solid ${props.theme.colors.grey}`};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.2rem;
  height: 2.2rem;
`;
