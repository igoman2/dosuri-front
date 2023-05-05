import { ChangeEvent, FC } from "react";
import styled from "@emotion/styled";
import AddressDivider from "@/components/Divider/AddressDivider";

interface AliasInputBarProps {
  inputText: string;
  placeHolder: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AliasInputBar: FC<AliasInputBarProps> = ({
  inputText,
  placeHolder,
  onInput,
}) => {
  return (
    <InputWrapper>
      <input
        placeholder={placeHolder}
        onChange={onInput}
        defaultValue={inputText}
      ></input>
      <AddressDivider height={1} />
    </InputWrapper>
  );
};

export default AliasInputBar;

const InputWrapper = styled.div`
  input {
    width: 100%;
    padding: 0 0 0.5rem;
    border-width: 0;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 400;
    color: ${(props) => props.theme.colors.black};
    ::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }
  }
`;
