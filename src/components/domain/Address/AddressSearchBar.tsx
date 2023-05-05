import { ChangeEvent, FC, FormEvent, useEffect, useRef } from "react";

import Image from "next/image";
import { css } from "@emotion/react";
import magnifier_grey from "@/public/assets/magnifier_grey.png";
import deleteIcon from "@/public/assets/delete.png";
import styled from "@emotion/styled";

interface IAddressSearchBarProps {
  inputText: string;
  placeHolder?: string;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  enableDelete: boolean;
  onSearch: () => void;
}

const AddressSearchBar: FC<IAddressSearchBarProps> = ({
  inputText,
  onInput,
  placeHolder,
  enableDelete,
  onSearch,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onDeleteButtonClick = () => {
    if (inputRef.current && inputRef.current.value) {
      inputRef.current.value = "";
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const image = css`
    position: absolute;
    left: 1rem;
    top: 0.7rem;
  `;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <SearchInputWrapper>
      <form onSubmit={onSubmit}>
        <span css={image}>
          <Image src={magnifier_grey} alt="magnifier" width={20} height={20} />
        </span>
        <input
          ref={inputRef}
          defaultValue={inputText}
          onChange={onInput}
          type="text"
          required
          placeholder={placeHolder}
        />
        {enableDelete ? (
          <span
            css={{
              position: "absolute",
              right: "1rem",
              top: "0.8rem",
            }}
          >
            <Image
              src={deleteIcon}
              alt="delete-icon"
              width={18}
              height={18}
              onClick={onDeleteButtonClick}
            />
          </span>
        ) : null}
      </form>
    </SearchInputWrapper>
  );
};

export default AddressSearchBar;

const SearchInputWrapper = styled.div`
  flex-grow: 1;

  form {
    position: relative;
    color: ${(props) => props.theme.colors.grey};
  }

  input {
    height: 3.4rem;
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    padding-left: 3.5rem;
    padding-right: 2rem;
    border-radius: 5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
  }
`;
