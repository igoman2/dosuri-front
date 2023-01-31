import * as Yup from "yup";

import { Field, FormikProvider, useFormik } from "formik";
import React, {
  ChangeEvent,
  Dispatch,
  FC,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { css, useTheme } from "@emotion/react";

import Content from "../Form/Content";
import { EmptyText } from "@/components/UI/emotion/EmptyText";
import FullModalBase from "@/components/Modal/FullModalBase";
import Icon from "@/util/Icon";
import { ModalBottom } from "./ModalBottom";
import { SearchInputWrapper } from "@/components/UI/emotion/Review/SearchInpuntWrapper";
import { TitleWrapper } from "@/components/UI/emotion/Review/TitleWrapper";
import { Treatment } from "@/types/community";
import { WriteReviewWrapper } from "@/components/UI/emotion/Review/WriteReviewWrapper";
import { createReviewState } from "./store";
import { useRecoilState } from "recoil";

interface IBasicProps {
  isActive: boolean;
  mode: number;
  setMode: Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onSwap: () => void;
}

const Basic: FC<IBasicProps> = ({
  isActive,
  onClose,
  mode,
  setMode,
  onSwap,
}) => {
  const theme = useTheme();
  const [reviewState, setReviewState] = useRecoilState(createReviewState);
  const [selectedKeyword, setSelectedKeyword] = useState<Treatment[]>(
    reviewState.treatmentKeywords
  );
  const treatmentPriceRef = useRef<HTMLInputElement>(null);

  const handleKeywordDelete = (
    e: MouseEvent<HTMLElement>,
    keyword: Treatment
  ) => {
    e.stopPropagation();

    setSelectedKeyword((prev) => {
      const tmp = [...prev];
      const index = tmp.findIndex(
        (treatment) => treatment.keyword === keyword.keyword
      );
      tmp[index].selected = false;
      delete tmp[index];
      tmp.splice(index, 1);
      return tmp;
    });
  };

  useEffect(() => {
    setReviewState((prev) => ({
      ...prev,
      treatmentKeywords: selectedKeyword,
    }));
  }, [selectedKeyword]);

  const handleHospitalSelect = () => {
    setMode(10);
  };

  const handleTreatmentSelect = () => {
    setMode(11);
  };

  const handleInputTreatmentPrice = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    var chars = value.split("").reverse();
    var withCommas = [];
    for (var i = 1; i <= chars.length; i++) {
      withCommas.push(chars[i - 1]);
      if (i % 3 == 0 && i != chars.length) {
        withCommas.push(",");
      }
    }
    var val = withCommas.reverse().join("");
    if (
      treatmentPriceRef &&
      treatmentPriceRef.current &&
      treatmentPriceRef.current.parentNode
    ) {
      const parentNode = treatmentPriceRef.current.parentNode as HTMLElement;
      parentNode.setAttribute("comma-value", val);
    }
    formik.handleChange(e);

    setReviewState((prev) => ({
      ...prev,
      treatmentPrice: e.target.value,
    }));
  };

  const handleInputTreatmentCount = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);

    setReviewState((prev) => ({
      ...prev,
      treatmentCount: e.target.value,
    }));
  };

  const image = css`
    position: absolute;
    right: 1rem;
    top: 1rem;
  `;

  interface MyFormValues {
    hospital: { name: string; uuid: string };
    treatment: Treatment[];
    treatmentPrice: string;
    treatmentCount: string;
  }

  const initialValues: MyFormValues = {
    hospital: reviewState.hospital,
    treatment: reviewState.treatmentKeywords,
    treatmentPrice: reviewState.treatmentPrice,
    treatmentCount: reviewState.treatmentCount,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      hospital: Yup.object().optional(),
      treatment: Yup.array().required(),
      price: Yup.string().optional(),
      treatmentCount: Yup.string().optional(),
    }),
    onSubmit: () => {
      console.log(formik);
    },
  });

  const isValid = () => {
    return (
      reviewState.hospital.name && reviewState.treatmentKeywords.length > 0
    );
  };

  return (
    <FullModalBase
      isActive={isActive}
      onClose={onClose}
      title="치료후기 쓰기 (1/3) - 기본정보"
    >
      <WriteReviewWrapper>
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <Content>
              <div className="container">
                <TitleWrapper>
                  <div className="title">방문하신 병원을 알려주세요.</div>
                  <div className="required">{"(필수)"}</div>
                </TitleWrapper>
              </div>
              <div onClick={handleHospitalSelect}>
                <SearchInputWrapper>
                  <span css={image}>
                    <Icon
                      name="arrow"
                      width="24"
                      height="24"
                      stroke={theme.colors.grey}
                      strokeWidth="2"
                      css={{
                        transform: "rotate(180deg)",
                      }}
                    />
                  </span>
                  <div
                    className={`input-box ${
                      reviewState.hospital.name ? "clicked" : ""
                    }`}
                  >
                    {reviewState.hospital.name
                      ? reviewState.hospital.name
                      : `병원 선택하기`}
                  </div>
                </SearchInputWrapper>
              </div>
            </Content>

            <Content>
              <div className="container">
                <TitleWrapper>
                  <div className="title">어떤 치료를 받으셨나요?</div>
                  <div className="required">{"(필수)"}</div>
                </TitleWrapper>
              </div>
              <div onClick={handleTreatmentSelect}>
                <SearchInputWrapper>
                  <span css={image}>
                    <Icon
                      name="arrow"
                      width="24"
                      height="24"
                      stroke={theme.colors.grey}
                      strokeWidth="2"
                      css={{
                        transform: "rotate(180deg)",
                      }}
                    />
                  </span>
                  <div className="input-box">
                    {selectedKeyword.length > 0 ? (
                      <div
                        css={{
                          display: "flex",
                          gap: "1rem",
                          margin: "1rem 0",
                          overflowX: "scroll",
                          flexWrap: "wrap",
                          paddingRight: "2rem",
                        }}
                      >
                        {selectedKeyword.map((keyword, i) => (
                          <div
                            key={`selected=${i}`}
                            css={{
                              backgroundColor: theme.colors.grey_light,
                              height: "3rem",
                              fontSize: theme.fontSizes.md,
                              lineHeight: theme.lineHeights.md,
                              color: theme.colors.black,
                              borderRadius: "2rem",
                              padding: "1rem 1rem",
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              cursor: "pointer",
                            }}
                            onClick={(e) => handleKeywordDelete(e, keyword)}
                          >
                            <div
                              css={{
                                paddingTop: "0.2rem",
                                width: "100%",
                              }}
                            >
                              {keyword.keyword}
                            </div>
                            <div
                              css={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Icon
                                name="close"
                                fill={theme.colors.black}
                                width="12"
                                height="12"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      `치료 선택하기`
                    )}
                  </div>
                </SearchInputWrapper>
              </div>
            </Content>

            <Content>
              <div className="container">
                <TitleWrapper>
                  <div className="title">진료 담당 의사를 선택해 주세요.</div>
                  <div className="optional">{"(선택)"}</div>
                </TitleWrapper>
              </div>
              <div onClick={handleTreatmentSelect}>
                <SearchInputWrapper>
                  <EmptyText>의사가 없습니다.</EmptyText>
                </SearchInputWrapper>
              </div>
            </Content>

            <Content>
              <div className="container">
                <TitleWrapper>
                  <div className="title">치료 담당 치료사를 선택해 주세요.</div>
                  <div className="optional">{"(선택)"}</div>
                </TitleWrapper>
              </div>
              <div>
                <SearchInputWrapper>
                  <EmptyText>치료사가 없습니다.</EmptyText>
                </SearchInputWrapper>
              </div>
            </Content>
            <Content>
              <div className="container">
                <TitleWrapper>
                  <div className="title">
                    도수치료의 회당 비용은 얼마였나요?
                  </div>
                  <div className="optional">{"(선택)"}</div>
                </TitleWrapper>
                <div className="input-form-layout">
                  <div className="input-small">
                    <input
                      ref={treatmentPriceRef}
                      className="field treatment-price"
                      type="number"
                      css={{ width: "12rem" }}
                      id="treatmentRrice"
                      name="treatmentRrice"
                      placeholder="원 단위로 입력"
                      onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleInputTreatmentPrice(e)
                      }
                    />
                  </div>

                  <div className="unit">원</div>
                </div>
              </div>
            </Content>

            <Content>
              <div className="container">
                <TitleWrapper>
                  <div className="title">총 치료 회수는 몇번인가요?</div>
                  <div className="optional">{"(선택)"}</div>
                </TitleWrapper>
                <div className="input-form-layout">
                  <div className="input-small">
                    <Field
                      css={{ width: "12rem" }}
                      className="field"
                      id="treatmentCount"
                      name="treatmentCount"
                      placeholder="숫자 입력"
                      type="number"
                      defaultValue={reviewState.treatmentCount}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        handleInputTreatmentCount(e);
                      }}
                    />
                  </div>
                  <div className="unit">회</div>
                </div>
              </div>
            </Content>
          </form>
        </FormikProvider>
        <ModalBottom
          mode={mode}
          setMode={setMode}
          onSwap={onSwap}
          disabled={!isValid()}
        />
      </WriteReviewWrapper>
    </FullModalBase>
  );
};

export default Basic;
