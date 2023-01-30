import React, {
  ChangeEvent,
  Dispatch,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { css, useTheme } from "@emotion/react";

import Button from "@/components/Button";
import { ButtonWrapper } from "@/components/UI/emotion/Review/ButtonWrapper";
import Checkbox from "@/components/UI/Checkbox";
import Divider from "@/components/UI/Divider";
import FullModalBase from "@/components/Modal/FullModalBase";
import Icon from "@/util/Icon";
import Image from "next/image";
import { Treatment } from "@/types/community";
import { WriteReviewWrapper } from "@/components/UI/emotion/Review/WriteReviewWrapper";
import { createReviewState } from "./store";
import magnifier_grey from "@/public/assets/magnifier_grey.png";
import styled from "@emotion/styled";
import { treatments } from "@/constants/Treatments";
import { useRecoilState } from "recoil";

const MAX_TREATMENT_COUNT = 3;

interface IChooseTreatmentProps {
  isActive: boolean;
  mode: number;
  setMode: Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onSwap: () => void;
}

const ChooseTreatment: FC<IChooseTreatmentProps> = ({
  isActive,
  setMode,
  onClose,
}) => {
  const image = css`
    position: absolute;
    left: 1rem;
    top: 0.8rem;
  `;
  const [inputText, setInputText] = useState("");
  const [reviewState, setReviewState] = useRecoilState(createReviewState);
  const theme = useTheme();
  const [keywordState, setKeywordState] = useState<Treatment[]>(treatments);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedKeyword, setSelectedKeyword] = useState<Treatment[]>(
    reviewState.treatmentKeywords
  );

  const searchedKeywords = useMemo(() => {
    return keywordState.filter((el) => el.keyword.includes(inputText));
  }, [inputText]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleListClick = (index: number) => {
    const tmp = [...keywordState];
    const isClicked = tmp[index].selected;

    if (!isClicked && checkMaxTreatmentCount()) {
      return;
    }

    tmp[index].selected = !isClicked;
    setKeywordState(tmp);
  };

  const checkMaxTreatmentCount = () => {
    return selectedKeyword.length === MAX_TREATMENT_COUNT;
  };

  const handleKeywordDelete = (keyword: Treatment) => {
    setKeywordState((prev) => {
      const tmp = [...prev];
      const index = tmp.findIndex((k) => k.keyword === keyword.keyword);
      const prevSelected = tmp[index].selected;
      tmp[index].selected = !prevSelected;
      return tmp;
    });
  };
  useEffect(() => {
    setSelectedKeyword(keywordState.filter((keyword) => keyword.selected));
  }, [keywordState]);

  const handleSubmitTreatmentKeyword = () => {
    setReviewState((prev) => ({
      ...prev,
      treatmentKeywords: selectedKeyword,
    }));
    setMode(0);
  };

  return (
    <FullModalBase
      isActive={isActive}
      onClose={() => setMode(0)}
      onClickBack={onClose}
      title="치료 선택"
      subTitle="최대 3개까지 선택"
      right={
        <Button
          text="적용"
          bold
          color={theme.colors.purple}
          backgroundColor={theme.colors.white}
          fontSize="xxl"
          onClick={handleSubmitTreatmentKeyword}
        />
      }
    >
      <WriteReviewWrapper>
        <div>
          <SearchInputWrapper>
            <form>
              <span css={image}>
                <Image
                  src={magnifier_grey}
                  alt="magnifier"
                  width={20}
                  height={20}
                />
              </span>
              <input
                type="text"
                id="roll"
                name="roll"
                required
                placeholder="병원 이름을 검색하세요"
                defaultValue={inputText}
                ref={inputRef}
                onChange={handleInput}
              />
            </form>
          </SearchInputWrapper>
          <div
            css={{
              display: "flex",
              flexWrap: "wrap",
              gap: "1rem",
              margin: "1rem 0",
            }}
          >
            {selectedKeyword.map((k, i) => (
              <div
                key={`selected=${i}`}
                css={{
                  backgroundColor: "#988FFF",
                  height: "3rem",
                  color: theme.colors.purple,
                  fontSize: theme.fontSizes.md,
                  lineHeight: theme.lineHeights.md,
                  borderRadius: "2rem",
                  padding: "1rem 1rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  cursor: "pointer",
                }}
                onClick={() => handleKeywordDelete(k)}
              >
                <span
                  css={{
                    paddingTop: "0.2rem",
                  }}
                >
                  {k.keyword}
                </span>
                <span
                  css={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="close"
                    fill={theme.colors.purple}
                    width="12"
                    height="12"
                  />
                </span>
              </div>
            ))}
          </div>
          <Main>
            {
              <>
                {searchedKeywords.map((keyword, i) => (
                  <div
                    className="link"
                    key={`keyword-${i}`}
                    onClick={() => handleListClick(i)}
                  >
                    <Divider height={1} />
                    <div className="item">
                      <Checkbox
                        text={keyword.keyword}
                        value={keyword.selected}
                      />
                    </div>
                  </div>
                ))}
              </>
            }
          </Main>
        </div>
      </WriteReviewWrapper>
    </FullModalBase>
  );
};

export default ChooseTreatment;

const SearchInputWrapper = styled.div`
  flex-grow: 1;

  form {
    position: relative;
    color: ${(props) => props.theme.colors.grey};
  }

  input {
    height: 3.4rem;
    width: 100%;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.md};
    padding-left: 3.5rem;
    border-radius: 5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }
  }
`;

const Main = styled.div`
  margin-top: 0.5rem;
  height: 100%;

  .link {
    cursor: pointer;
    margin: 0 -2rem;
    width: 100vw;

    .item {
      margin: 0 2rem;
      display: flex;
      align-items: center;
      padding: 1rem 0;
    }
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
