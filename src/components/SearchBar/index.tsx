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
import styled from "@emotion/styled";
import { useCreateSearchHistory } from "@/hooks/service/useCreateSearchHistory";
import { useRouter } from "next/router";

interface ISearchBarProps {
  inputText: string;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<ISearchBarProps> = ({ inputText, onInput }) => {
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
  const [isActive, setIsActive] = useState(router.asPath !== "/search/input");

  const onClickHandler = () => {
    if (isActive) {
      router.replace("/search/input");
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
    if (router.asPath !== "/search/input") {
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
    <SearchInputWrapper onClick={onClickHandler}>
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
          placeholder="병원, 지역, 후기 키워드 검색하기"
        />
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
