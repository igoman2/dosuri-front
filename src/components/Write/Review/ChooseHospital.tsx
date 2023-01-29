import React, {
  ChangeEvent,
  Dispatch,
  FC,
  useEffect,
  useRef,
  useState,
} from "react";
import { useBoolean, useDebounce } from "usehooks-ts";

import Button from "@/components/Button";
import { ButtonWrapper } from "@/components/UI/emotion/Review/ButtonWrapper";
import Divider from "@/components/UI/Divider";
import FullModalBase from "@/components/Modal/FullModalBase";
import { IHospitalInfoResult } from "@/service/types";
import Image from "next/image";
import { WriteReviewWrapper } from "@/components/UI/emotion/Review/WriteReviewWrapper";
import { createReviewState } from "./store";
import { css } from "@emotion/react";
import magnifier_grey from "@/public/assets/magnifier_grey.png";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useRecoilState } from "recoil";
import { useSearchHospital } from "@/hooks/service/useSearchHospital";

interface IChooseHospitalProps {
  isActive: boolean;
  mode: number;
  setMode: Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onSwap: () => void;
}
const ChooseHospital: FC<IChooseHospitalProps> = ({
  isActive,
  mode,
  setMode,
  onClose,
  onSwap,
}) => {
  const image = css`
    position: absolute;
    left: 1rem;
    top: 0.8rem;
  `;
  const [inputText, setInputText] = useState("");
  const { value, setTrue, setFalse } = useBoolean(false);
  const debouncedValue = useDebounce<string>(inputText, 300);
  const [reviewState, setReviewState] = useRecoilState(createReviewState);

  const { searchedHospitalList } = useSearchHospital({
    query: inputText,
    isInput: value,
    page_size: 30,
  });

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTrue();
    setInputText(e.target.value);
  };

  useEffect(() => {
    setFalse();
  }, [debouncedValue]);

  const handleListClick = (hospital: IHospitalInfoResult) => {
    setReviewState((prev) => ({
      ...prev,
      hospital: { name: hospital.name, uuid: hospital.uuid },
    }));
    setMode(0);
  };

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
    <FullModalBase
      isActive={isActive}
      onClose={() => setMode(0)}
      onClickBack={onClose}
      title="병원 선택"
    >
      <WriteReviewWrapper>
        <div>
          <SearchInputWrapper>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
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
          <Main>
            {
              <HospitalQueryListWrapper>
                {searchedHospitalList.map((searchedHospital) => (
                  <div
                    className="link"
                    key={searchedHospital.uuid}
                    onClick={() => handleListClick(searchedHospital)}
                  >
                    <>
                      <Divider height={1} />
                      <div className="item">
                        <span className="word">
                          {highlightIncludedText(
                            searchedHospital.name,
                            inputText
                          )}
                        </span>
                      </div>
                    </>
                  </div>
                ))}
              </HospitalQueryListWrapper>
            }
          </Main>
        </div>
      </WriteReviewWrapper>
    </FullModalBase>
  );
};

export default ChooseHospital;

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
  margin-top: 1rem;
  height: 100%;

  .link {
    cursor: pointer;
    margin: 0 -2rem;
    width: 100vw;

    .item {
      margin: 0 2rem;
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

const HospitalQueryListWrapper = styled.div`
  .item {
    padding: 1rem 0;

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
