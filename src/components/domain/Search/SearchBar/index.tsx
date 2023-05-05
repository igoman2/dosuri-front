import React, {
  ChangeEvent,
  FC,
  FormEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import Image from "next/image";
import { css } from "@emotion/react";
import magnifier_grey from "@/public/assets/magnifier_grey.png";
import deleteIcon from "@/public/assets/delete.png";
import styled from "@emotion/styled";
import { useCreateSearchHistory } from "@/hooks/service/useCreateSearchHistory";
import { useRouter } from "next/router";

interface ISearchBarProps {
  inputText: string;
  placeHolder?: string;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  enableDelete?: boolean;
  hasFocus?: boolean;
}

const SearchBar: FC<ISearchBarProps> = ({
  inputText,
  onInput,
  onClick,
  placeHolder,
  enableDelete,
  hasFocus,
}) => {
  const { mutate: createSearchHistory } = useCreateSearchHistory();

  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createSearchHistory(inputText, {
      onSuccess: () => {
        router.replace({
          pathname: `/search/${inputText}`,
          query: { keyword: inputText, tab: "all" },
        });
      },
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isActive, setIsActive] = useState(
    Object.keys(router.query).length > 0
  );

  const onClickHandler = () => {
    if (isActive) {
      router.replace("/search/input");
    } else {
      router.push("/search/input");
    }
  };

  if (!onClick) onClick = onClickHandler;

  const onDeleteButtonClick = () => {
    if (inputRef.current && inputRef.current.value) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (router.query.keyword) {
      if (inputRef.current) {
        inputRef.current.value = router.query.keyword as string;
      }
      return;
    }
  }, [router]);

  useEffect(() => {
    if (!hasFocus) {
      return;
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [router]);

  const image = css`
    position: absolute;
    left: 1rem;
    top: 0.7rem;
  `;

  return (
    <SearchInputWrapper onClick={onClick}>
      <form onSubmit={onSearch}>
        <span css={image}>
          <Image src={magnifier_grey} alt="magnifier" width={20} height={20} />
        </span>
        <input
          ref={inputRef}
          defaultValue={inputText}
          onChange={onInput}
          type="text"
          id="roll"
          name="roll"
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

export default SearchBar;

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
