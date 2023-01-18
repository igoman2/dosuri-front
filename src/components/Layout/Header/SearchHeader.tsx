import React, { ChangeEvent, FC } from "react";

import Icon from "@/util/Icon";
import SearchBar from "@/components/SearchBar";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

interface ISearchHeaderProps {
  inputText: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchHeader: FC<ISearchHeaderProps> = ({ inputText, onInput }) => {
  const router = useRouter();

  const onBack = () => {
    router.back();
  };

  return (
    <SearchWrapper>
      <div className="header">
        <BackButton onClick={onBack}>
          <Icon
            name="arrow"
            width="24"
            height="24"
            stroke="black"
            strokeWidth="2"
          />
        </BackButton>
        <div className="center">
          {<SearchBar inputText={inputText} onInput={onInput} />}
        </div>
      </div>
    </SearchWrapper>
  );
};

export default SearchHeader;

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
`;

const BackButton = styled.div`
  cursor: pointer;
`;
