import { FC, ReactElement } from "react";

import Divider from "./Divider";
import { Theme } from "@emotion/react";
import styled from "@emotion/styled";

interface IListTabProps {
  text: string;
  subText: string;
  hasNoti?: boolean;
  isLast: boolean;
  right?: ReactElement;
  color?: keyof Theme["colors"];
  onClick?: () => void;
}
// type SUBJECT = typeof SUBJECT[keyof typeof SUBJECT]; // 'Math' | 'English'

const ListTab: FC<IListTabProps> = ({
  text,
  subText,
  hasNoti,
  isLast,
  right,
  color,
  onClick,
}) => {
  return (
    <>
      <ListTabWrapper isLast={isLast} color={color} onClick={onClick}>
        <div className="list-title">
          <div className="text">
            <div>{text}</div>
            {hasNoti && <div className="bubble"></div>}
          </div>
          <div className="sub-text">{subText}</div>
        </div>
        <div>{right}</div>
      </ListTabWrapper>
      {!isLast && <Divider height={1} />}
    </>
  );
};

export default ListTab;

interface ListTapWrapperProps {
  isLast: boolean;
  color?: keyof Theme["colors"];
}

const ListTabWrapper = styled.div<ListTapWrapperProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 0rem;
  cursor: pointer;

  .list-title {
    display: flex;
    gap: 2rem;
    align-items: center;

    & .bubble {
      position: absolute;
      top: 0.2rem;
      right: -0.7rem;
      border-radius: 50%;
      background-color: red;
      width: 0.5rem;
      height: 0.5rem;
    }

    & .text {
      position: relative;
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.xl};
      font-weight: 700;
      color: ${(props) =>
        props.color
          ? props.theme.colors[props.color]
          : props.theme.colors.black};
    }

    & .sub-text {
      color: ${(props) => props.theme.colors.purple};
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};
    }
  }
`;
