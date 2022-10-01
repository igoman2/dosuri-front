import Image from "next/image";
import React, { ChangeEvent, FormEvent, useState } from "react";
import magnifier_grey from "@/public/assets/magnifier_grey.png";
import { css, useTheme } from "@emotion/react";

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const onSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(inputText);
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const theme = useTheme();

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
