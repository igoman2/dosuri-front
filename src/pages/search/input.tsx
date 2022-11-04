import Layout from "@/components/Layout";
import React, { ChangeEvent, useState } from "react";
import RecentSearchList from "@/components/UI/RecentSearchList";
import { recentSearchList } from "@/mock/recentSearchList";
import SearchHeader from "@/components/SearchHeader";
import styled from "@emotion/styled";

const SearchInput = () => {
  const [inputText, setInputText] = useState("");

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  return (
    <Layout header={<SearchHeader onInput={onInput} inputText={inputText} />}>
      <Main>
        <div className="head">
          <div className="title">최근검색어</div>
          <div className="delete-all">전체 삭제</div>
        </div>

        {recentSearchList.map((word, i) => (
          <RecentSearchList text={word} inputText={inputText} key={i} />
        ))}
      </Main>
    </Layout>
  );
};

export default SearchInput;

const Main = styled.div`
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
`;
