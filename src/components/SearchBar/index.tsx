import React, { ChangeEvent, FC, FormEvent, useEffect, useRef } from "react";
import { css, useTheme } from "@emotion/react";

import Image from "next/image";
import magnifier_grey from "@/public/assets/magnifier_grey.png";
import { useRouter } from "next/router";

interface ISearchBarProps {
  inputText?: string;
  onInput?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: FC<ISearchBarProps> = ({ inputText, onInput }) => {
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace({
      pathname: `/search/${inputText}`,
      query: { keyword: inputText, tab: "all" },
    });
  };

  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  const router = useRouter();

  const onClickHandler = () => {
    if (router.asPath !== "/search/input") {
      router.push("/search/input");
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
  const inputWrapper = css`
    position: relative;
    color: ${theme.colors.grey};
  `;

  const input = css`
    height: 3.4rem;
    width: 100%;
    font-size: ${theme.fontSizes.md};
    line-height: ${theme.lineHeights.md};
    padding-left: 4rem;
    border-radius: 5rem;
    border: 0.1rem solid ${theme.colors.grey};

    ::placeholder {
      color: ${theme.colors.grey};
    }
  `;

  const image = css`
    position: absolute;
    left: 1rem;
    top: 0.7rem;
  `;

  return (
    <div
      css={{
        flexGrow: 1,
      }}
      onClick={onClickHandler}
    >
      <form onSubmit={onSearch}>
        <div css={inputWrapper}>
          <span css={image}>
            <Image
              src={magnifier_grey}
              alt="magnifier"
              width={20}
              height={20}
            />
          </span>
          <input
            ref={inputRef}
            css={input}
            value={inputText}
            onChange={onInput}
            type="text"
            id="roll"
            name="roll"
            required
            placeholder="병원, 지역, 후기 키워드 검색하기"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
