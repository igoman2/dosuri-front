import React, { ChangeEvent, useEffect, useState } from "react";
import { useBoolean, useDebounce } from "usehooks-ts";

import HospitalQueryList from "@/components/domain/Search/HospitalQueryList";
import Layout from "@/components/Layout";
import Link from "next/link";
import { NextSeo } from "next-seo";
import RecentSearchList from "@/components/domain/Search/RecentSearchList";
import SearchHeader from "@/components/Layout/Header/SearchHeader";
import styled from "@emotion/styled";
import { useCreateSearchHistory } from "@/hooks/service/useCreateSearchHistory";
import { useDeleteSearchHistory } from "@/hooks/service/useDeleteSearchHistory";
import { useDeleteSearchHistoryAll } from "@/hooks/service/useDeleteSearchHistoryAll";
import { useRecentHospitalSearchList } from "@/hooks/service/useRecentHospitalSearchList";
import { useRouter } from "next/router";
import { useSearchHospitalByKeyword } from "@/hooks/service/useSearchHospitalByKeyword";

const SearchInput = () => {
  const [inputText, setInputText] = useState("");
  const { value, setTrue, setFalse } = useBoolean(false);
  const debouncedValue = useDebounce<string>(inputText, 300);
  const router = useRouter();

  const { searchedHospitalList } = useSearchHospitalByKeyword({
    query: inputText,
    isInput: value,
    page_size: 30,
  });

  const { mutate } = useDeleteSearchHistory();
  const { mutate: deleteAllHistory } = useDeleteSearchHistoryAll();
  const { mutate: createSearchHistory } = useCreateSearchHistory();

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

  const handleDeleteAllHistory = () => {
    deleteAllHistory();
  };

  const handleListClick = (id: string) => {
    createSearchHistory(inputText, {
      onSuccess: () => {
        router.push(`/hospital/${id}`);
      },
    });
  };

  return (
    <Layout
      header={<SearchHeader onInput={onInput} inputText={inputText} />}
      footer={false}
    >
      <NextSeo
        title="병원찾기 | 도수리-도수치료 리얼후기"
        canonical="https://www.dosuri.site/search/input"
        openGraph={{
          url: "https://www.dosuri.site/search/input",
        }}
      />

      <Main>
        {inputText.length > 0 ? (
          <>
            {searchedHospitalList.map((searchedHospital) => (
              <div
                className="link"
                key={searchedHospital.uuid}
                onClick={() => handleListClick(searchedHospital.uuid)}
              >
                <HospitalQueryList
                  text={searchedHospital.name}
                  inputText={inputText}
                ></HospitalQueryList>
              </div>
            ))}
          </>
        ) : (
          <div>
            <div className="head">
              <div className="title">최근 검색어</div>
              <div className="delete-all" onClick={handleDeleteAllHistory}>
                전체삭제
              </div>
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

  .link {
    cursor: pointer;
  }

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
