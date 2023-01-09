import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useBoolean, useDebounce } from "usehooks-ts";

import HospitalQueryList from "@/components/Search/HospitalQueryList";
import Layout from "@/components/Layout";
import Link from "next/link";
import RecentSearchList from "@/components/UI/RecentSearchList";
import SearchHeader from "@/components/Layout/Header/SearchHeader";
import styled from "@emotion/styled";
import { useDeleteSearchHistory } from "@/hooks/service/useDeleteSearchHistory";
import { useRecentHospitalSearchList } from "@/hooks/service/useRecentHospitalSearchList";
import { useSearchHospital } from "@/hooks/service/useSearchHospital";

const SearchInput = () => {
  const [inputText, setInputText] = useState("");
  const { value, setTrue, setFalse } = useBoolean(false);
  const debouncedValue = useDebounce<string>(inputText, 300);

  const { searchedHospitalList } = useSearchHospital({
    query: inputText,
    isInput: value,
  });
  const { mutate } = useDeleteSearchHistory();

  const { recentSearchedHospitalList } = useRecentHospitalSearchList();
  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTrue();
    setInputText(e.target.value);
  };

  useEffect(() => {
    setFalse();
  }, [debouncedValue]);

  const handleDeleteSearchHistory = (deletedHospitalId: string) => {
    mutate(deletedHospitalId);
  };

  return (
    <Layout
      header={<SearchHeader onInput={onInput} inputText={inputText} />}
      footer={false}
    >
      <Main>
        {inputText.length > 0 ? (
          <div>
            {searchedHospitalList.map((searchedHospital) => (
              <Link
                href={`/hospital/${searchedHospital.uuid}`}
                key={searchedHospital.uuid}
              >
                <a>
                  <HospitalQueryList
                    text={searchedHospital.name}
                    inputText={inputText}
                  ></HospitalQueryList>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            <div className="head">
              <div className="title">최근 검색어</div>
              <div className="delete-all">전체삭제</div>
            </div>
            {recentSearchedHospitalList.map((recentSearchedHospital) => (
              <RecentSearchList
                key={recentSearchedHospital.uuid}
                text={recentSearchedHospital.word}
                inputText={inputText}
                onDelete={() =>
                  handleDeleteSearchHistory(recentSearchedHospital.uuid)
                }
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
