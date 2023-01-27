import React, { FC } from "react";

import Icon from "@/util/Icon";
import styled from "@emotion/styled";

interface ICheckboxProps {
  text: string;
  value?: boolean;
  onClick?: () => void;
}

const Checkbox: FC<ICheckboxProps> = ({ value, text, onClick }) => {
  const onCheckToggle = () => {
    onClick && onClick();
  };

  return (
    <div onClick={onCheckToggle} css={{ cursor: "pointer" }}>
      <CheckBoxLayout>
        <CheckBoxWrapper isChecked={value}>
          <Icon name="check" />
        </CheckBoxWrapper>
        <div className="checkbox-label">{text}</div>
      </CheckBoxLayout>
    </div>
  );
};

export default Checkbox;

interface Props {
  isChecked?: boolean;
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
