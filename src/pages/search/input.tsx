import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import SearchBar from "@/components/SearchBar";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const SearchInput = () => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <div>
      <div
        css={{
          display: "flex",
          gap: "1rem",
          justifyContent: "center",
          alignItems: "center",
          "& .center": {
            flexGrow: 1,
          },
          height: "4.8rem",
          marginBottom: "1.5rem",
          padding: "0 1rem",
        }}
      >
        <BackButton onClick={onBack}>
          <Icon name="arrow" width="24" height="24" />
        </BackButton>
        <div className="center">{<SearchBar />}</div>
      </div>
      <div>최근검색어</div>
    </div>
  );
};

export default SearchInput;

const BackButton = styled.div`
  cursor: pointer;
`;
