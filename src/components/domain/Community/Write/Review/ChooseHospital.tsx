import { IHospitalInfoResponse, IHospitalInfoResult } from "@/types/service";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useBoolean, useDebounce } from "usehooks-ts";
import { useInfiniteQuery, useMutation } from "react-query";

import Divider from "@/components/Divider/Divider";
import FullModalBase from "@/components/Modal/FullModalBase";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroller";
import { WriteReviewWrapper } from "@/components/etc/emotion/Review/WriteReviewWrapper";
import api from "@/service/axiosConfig";
import { createReviewState } from "./store";
import { createTempHospital } from "@/service/apis/hospital";
import { css } from "@emotion/react";
import magnifier_grey from "@/public/assets/magnifier_grey.png";
import styled from "@emotion/styled";
import { useRecoilState, useSetRecoilState } from "recoil";
import { closeModalDirectionState } from "@/components/Modal/store";
import { DIRECTION } from "@/types/common";

interface IChooseHospitalProps {
  isActive: boolean;
  mode: number;
  setMode: (val: number) => void;
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
  const setCloseModalDirection = useSetRecoilState(closeModalDirectionState);

  const initialUrl = useMemo(() => {
    return `/hospital/v1/hospitals?search=${inputText}`;
  }, [inputText]);

  const fetchUrl = async (url: string) => {
    const response = await api.get<IHospitalInfoResponse>(url);
    return response.data;
  };

  const { mutate } = useMutation(createTempHospital);

  const {
    data: searchedHospitalList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["choose-hospital", inputText],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
      suspense: false,
    }
  );

  const fetchNextList = () => {
    if (isFetching) {
      return;
    }
    fetchNextPage();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTrue();
    setInputText(e.target.value);
  };

  useEffect(() => {
    setFalse();
  }, [debouncedValue]);

  const handleListClick = (hospital: IHospitalInfoResult) => {
    setCloseModalDirection({ direction: DIRECTION.Down });
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

  const handleClickHospital = () => {
    mutate(
      { name: inputText },
      {
        onSuccess: (resp) => {
          setReviewState((prev) => ({
            ...prev,
            hospital: { name: resp.name, uuid: resp.uuid },
          }));
          setMode(0);
        },
      }
    );
  };

  return (
    <FullModalBase
      isActive={isActive}
      onClose={() => {
        setCloseModalDirection({ direction: DIRECTION.Down });
        setMode(0);
      }}
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
          <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
            {searchedHospitalList?.pages.map((pageData, i) => {
              if (pageData.count === 0) {
                return (
                  <Main key={`hospital-list-${i}`}>
                    <HospitalQueryListWrapper>
                      <div className="link" onClick={handleClickHospital}>
                        <Divider height={1} />
                        <div className="item">
                          <span className="word">{inputText}</span>
                        </div>
                      </div>
                    </HospitalQueryListWrapper>
                  </Main>
                );
              }

              return (
                <Main key={i}>
                  <HospitalQueryListWrapper>
                    {pageData.results.map((searchedHospital) => (
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
                </Main>
              );
            })}
          </InfiniteScroll>
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
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};
    }
  }

  .delete-icon {
    padding-right: 0.7rem;
  }

  .highlight {
    color: ${(props) => props.theme.colors.purple};
  }
`;
