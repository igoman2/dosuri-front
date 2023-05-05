import { MouseEvent, FC } from "react";
import styled from "@emotion/styled";

interface setAddressAliasButtonProps {
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  isValid: boolean;
}

const setAddressAliasButton: FC<setAddressAliasButtonProps> = ({
  onClick,
  isValid,
}) => {
  return (
    <ButtonWrapper onClick={onClick} disabled={!isValid}>
      완료
    </ButtonWrapper>
  );
};

export default setAddressAliasButton;

const ButtonWrapper = styled.div<{ disabled: boolean }>`
  height: 5.2rem;
  border-radius: 0.5rem;
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: ${(props) => props.theme.lineHeights.lg};
  font-weight: 700;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.purple_light};
  text-align: center;
  padding-top: 1.5rem;
  ${(props) =>
    props.disabled &&
    `
    opacity: 0.5;
    cursor: default;
    pointer-events: none;
  `}
`;
