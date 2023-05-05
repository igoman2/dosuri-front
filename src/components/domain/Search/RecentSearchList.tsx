import React, { FC } from "react";

import DeleteIcon from "@/public/assets/close.png";
import Image from "next/image";
import Link from "next/link";
import styled from "@emotion/styled";

interface IRecentSearchListProps {
  text: string;
  inputText: string;
  onDelete: () => void;
}

const RecentSearchList: FC<IRecentSearchListProps> = ({
  text,
  inputText,
  onDelete,
}) => {
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
      <>
        <Link href={`/search/${text}?keyword=${text}&tab=all`} replace>
          <a>
            <div className="item">
              <span className="word">
                {highlightIncludedText(text, inputText)}
              </span>
            </div>
          </a>
        </Link>
        <span className="delete-icon" onClick={onDelete}>
          <Image src={DeleteIcon} width={10.5} height={10.5} alt="delete" />
        </span>
      </>
    </RecentSearchListWrapper>
  );
};

export default RecentSearchList;

const RecentSearchListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    flex-grow: 1;
  }
  .item {
    padding: 0.5rem 0;

    .word {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
    }
  }

  .delete-icon {
    padding-right: 0.7rem;
    cursor: pointer;
  }

  .highlight {
    color: ${(props) => props.theme.colors.purple};
  }
`;
