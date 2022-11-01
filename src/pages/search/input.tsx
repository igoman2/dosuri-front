import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import SearchBar from "@/components/SearchBar";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import React, { ChangeEvent, useState } from "react";
import RecentSearchList from "@/components/UI/RecentSearchList";
import { recentSearchList } from "@/mock/recentSearchList";

const SearchInput = () => {
  const router = useRouter();
  const [inputText, setInputText] = useState("");

  const onBack = () => {
    router.back();
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    console.log(inputText);
  };

  return (
    <SearchWrapper>
      <div className="header">
        <BackButton onClick={onBack}>
          <Icon name="arrow" width="24" height="24" />
        </BackButton>
        <div className="center">
          {<SearchBar inputText={inputText} onInput={onInput} />}
        </div>
      </div>
      <div className="main">
        <div className="head">
          <div className="title">최근검색어</div>
          <div className="delete-all">전체 삭제</div>
        </div>

        {recentSearchList.map((word, i) => (
          <RecentSearchList text={word} inputText={inputText} key={i} />
        ))}
      </div>
    </SearchWrapper>
  );
};

export default SearchInput;

const SearchWrapper = styled.div`
  .header {
    display: flex;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    height: 4.8rem;
    margin-bottom: 1.5rem;
    padding: 0 1rem;
  }

  & .center {
    flex-grow: 1;
  }

  .main {
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 2rem;
    margin-top: 0.5rem;
    height: 100%;

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;

      .title {
        font-size: ${(props) => props.theme.fontSizes.md};
        line-height: ${(props) => props.theme.lineHeights.md};
        font-weight: 700;
      }

      .delete-all {
        font-size: ${(props) => props.theme.fontSizes.sm};
        line-height: ${(props) => props.theme.lineHeights.sm};
        color: ${(props) => props.theme.colors.grey};
      }
    }
  }
`;

const BackButton = styled.div`
  cursor: pointer;
`;
