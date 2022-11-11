import React, { FC } from "react";
import DeleteIcon from "@/public/assets/close.png";
import Image from "next/image";
import styled from "@emotion/styled";

interface IRecentSearchListProps {
  text: string;
  inputText: string;
}

const RecentSearchList: FC<IRecentSearchListProps> = ({ text, inputText }) => {
  const highlightIncludedText = (text: string, value: string) => {
    const title = text.toLowerCase();
    const searchValue = value.toLowerCase();
    if (searchValue !== "" && title.includes(searchValue)) {
      const matchText = text.split(new RegExp(`(${searchValue})`, "gi"));

      return (
        <>
          {matchText.map((text, index) =>
            text.toLowerCase() === searchValue.toLowerCase() ? (
              <span className="highlight" key={index}>
                {text}
              </span>
            ) : (
              text
            )
          )}
        </>
      );
    }

    return text;
  };

  return (
    <RecentSearchListWrapper>
      <div className="item">
        <span className="word">{highlightIncludedText(text, inputText)}</span>
      </div>
      <span className="delete-icon">
        <Image src={DeleteIcon} width={10.5} height={10.5} alt="delete" />
      </span>
    </RecentSearchListWrapper>
  );
};

export default RecentSearchList;

const RecentSearchListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  .item {
    padding: 0.5rem 0;

    .word {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
    }
  }

  .delete-icon {
    padding-right: 0.7rem;
  }

  .highlight {
    color: ${(props) => props.theme.colors.purple};
  }
`;