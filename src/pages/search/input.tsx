import React, { ChangeEvent, useEffect, useMemo, useState } from "react";

import Layout from "@/components/Layout";
import RecentSearchList from "@/components/UI/RecentSearchList";
import SearchHeader from "@/components/Layout/Header/SearchHeader";
import styled from "@emotion/styled";
import { useRecentHospitalSearchList } from "@/hooks/service/useRecentHospitalSearchList";
import { useBoolean, useDebounce } from "usehooks-ts";
import { useSearchHospital } from "@/hooks/service/useSearchHospital";
import HospitalQueryList from "@/components/Search/HospitalQueryList";

const SearchInput = () => {
  const [inputText, setInputText] = useState("");
  const { value, setTrue, setFalse } = useBoolean(false);
  const debouncedValue = useDebounce<string>(inputText, 300);

  const { searchedHospitalList } = useSearchHospital({
    query: inputText,
    isInput: value,
  });

  const { recentSearchedHospitalList } = useRecentHospitalSearchList();
  console.log(searchedHospitalList);
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTrue();
    setInputText(e.target.value);
  };

  useEffect(() => {
    setFalse();
  }, [debouncedValue]);

  return (
    <Layout header={<SearchHeader onInput={onInput} inputText={inputText} />}>
      <Main>
        {inputText.length > 0 ? (
          <div>
            {searchedHospitalList.map((searchedHospital) => (
              <HospitalQueryList
                text={searchedHospital.name}
                inputText={inputText}
                key={searchedHospital.uuid}
              ></HospitalQueryList>
            ))}
          </div>
        ) : (
          <div>
            <div className="head">
              <div className="title">최근검색어</div>
              <div className="delete-all">전체 삭제</div>
            </div>
            {recentSearchedHospitalList.map((recentSearchedHospital) => (
              <RecentSearchList
                text={recentSearchedHospital.word}
                inputText={inputText}
                key={recentSearchedHospital.uuid}
              />
            ))}
          </div>
        )}
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
