import * as Yup from "yup";

import { Field, FormikProvider, useFormik } from "formik";
import React, { ChangeEvent, Dispatch, FC, useEffect, useState } from "react";

import AttachImage from "./AttachImage";
import Content from "../Form/Content";
import FullModalBase from "@/components/Modal/FullModalBase";
import Icon from "@/util/Icon";
import { ModalBottom } from "./ModalBottom";
import { TitleWrapper } from "@/components/etc/emotion/Review/TitleWrapper";
import { WriteReviewWrapper } from "@/components/etc/emotion/Review/WriteReviewWrapper";
import { createReviewState } from "./store";
import styled from "@emotion/styled";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useTheme } from "@emotion/react";
import { closeModalDirectionState } from "@/components/Modal/store";

const MAX_IMAGE_NUMBER = 10;

interface IDetailProps {
  isActive: boolean;
  mode: number;
  setMode: Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onSwap: () => void;
}

const Detail: FC<IDetailProps> = ({
  isActive,
  mode,
  setMode,
  onClose,
  onSwap,
}) => {
  const [reviewState, setReviewState] = useRecoilState(createReviewState);
  const [imgFiles, setImgFiles] = useState<string[]>(reviewState.detailImages);
  const [imagesId, setImagesId] = useState<string[]>(
    reviewState.article_attachment_assoc.map((attach) => attach.attachment)
  );
  const [isUploadingComplete, setIsUploadingComplete] = useState(true);
  const theme = useTheme();
  const setCloseModalDirection = useSetRecoilState(closeModalDirectionState);

  interface MyFormValues {
    content: string;
  }

  const initialValues: MyFormValues = {
    content: reviewState.content,
  };

  const formik = useFormik({
    enableReinitialize: false,
    initialValues,
    validationSchema: Yup.object({
      content: Yup.string().min(20),
    }),
    onSubmit: () => {},
  });

  const handleMode = (modeNum: number) => {
    setMode(modeNum);
    setCloseModalDirection({ direction: "UP" });
  };

  useEffect(() => {
    setReviewState((prev) => ({
      ...prev,
      article_attachment_assoc: imagesId.map((id) => ({
        attachment: id,
      })),
    }));
  }, [imagesId]);

  useEffect(() => {
    setReviewState((prev) => ({
      ...prev,
      detailImages: imgFiles,
    }));
  }, [imgFiles]);

  const isValid = () => {
    return (
      reviewState.treatment_effect &&
      reviewState.doctor_kindness &&
      reviewState.therapist_kindness &&
      reviewState.staff_kindness &&
      reviewState.clean_score &&
      formik.isValid &&
      (formik.dirty || formik.values.content.length > 0) &&
      isUploadingComplete
    );
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    setReviewState((prev) => ({ ...prev, content: e.target.value }));
  };

  const getQuestionTitle = (type: string) => {
    switch (type) {
      case "treatment_effect":
        return "진료와 치료의 효과는 좋았나요?";
      case "doctor_kindness":
        return "의사는 친절했나요?";
      case "therapist_kindness":
        return "치료사는 친절했나요?";
      case "staff_kindness":
        return "병원 스탭은 친절했나요?";
      case "clean_score":
        return "병원 시설은 청결하고 위생적이었나요?";
    }
  };

  const renderIcons = (
    element:
      | "treatment_effect"
      | "doctor_kindness"
      | "therapist_kindness"
      | "staff_kindness"
      | "clean_score"
  ) => {
    return (
      <FaceIconsQuestions>
        <div className="question">{getQuestionTitle(element)}</div>
        <div className="face-container">
          <div
            className="inner"
            onClick={() => {
              setReviewState((prev) => ({ ...prev, [element]: "1" }));
            }}
          >
            <Icon
              name="sad"
              stroke={
                reviewState[element] === "1"
                  ? theme.colors.purple
                  : theme.colors.grey
              }
            />
            <div
              css={{
                color:
                  reviewState[element] === "1"
                    ? theme.colors.purple
                    : theme.colors.grey,
                fontSize: theme.fontSizes.md,
                lineHeight: theme.lineHeights.md,
              }}
            >
              별로였어요
            </div>
          </div>
          <div
            className="inner"
            onClick={() => {
              setReviewState((prev) => ({ ...prev, [element]: "2" }));
            }}
          >
            <Icon
              name="neutral"
              stroke={
                reviewState[element] === "2"
                  ? theme.colors.purple
                  : theme.colors.grey
              }
            />

            <div
              css={{
                color:
                  reviewState[element] === "2"
                    ? theme.colors.purple
                    : theme.colors.grey,
                fontSize: theme.fontSizes.md,
                lineHeight: theme.lineHeights.md,
              }}
            >
              보통이었어요
            </div>
          </div>
          <div
            className="inner"
            onClick={() => {
              setReviewState((prev) => ({ ...prev, [element]: "3" }));
            }}
          >
            <Icon
              name="happy"
              stroke={
                reviewState[element] === "3"
                  ? theme.colors.purple
                  : theme.colors.grey
              }
            />

            <div
              css={{
                color:
                  reviewState[element] === "3"
                    ? theme.colors.purple
                    : theme.colors.grey,
                fontSize: theme.fontSizes.md,
                lineHeight: theme.lineHeights.md,
              }}
            >
              좋았어요
            </div>
          </div>
        </div>
      </FaceIconsQuestions>
    );
  };

  return (
    <FullModalBase
      isActive={isActive}
      onClose={onClose}
      title="치료후기 쓰기 (2/3) - 상세정보"
    >
      <WriteReviewWrapper>
        <div>
          <Content>
            <div className="container">
              <TitleWrapper>
                <div className="title">병원 평가</div>
                <div className="required">{"(필수)"}</div>
              </TitleWrapper>
              <div
                css={{
                  marginTop: "1rem",
                }}
              >
                {renderIcons("treatment_effect")}
                {renderIcons("doctor_kindness")}
                {renderIcons("therapist_kindness")}
                {renderIcons("staff_kindness")}
                {renderIcons("clean_score")}
              </div>
            </div>
          </Content>

          <Content>
            <InputWrapper>
              <div className="container">
                <div className="title-layout">
                  <TitleWrapper>
                    <div className="title">치료 후기를 자세히 적어주세요.</div>
                    <div className="required">{"(필수)"}</div>
                  </TitleWrapper>
                </div>
                <div
                  className={`text-limit ${
                    formik.isValid
                      ? formik.dirty || formik.values.content.length > 0
                        ? "success"
                        : "initial"
                      : "error"
                  } ${formik.dirty ? "" : "initial"}`}
                >
                  {formik.values.content.length}자 / 최소 20자
                </div>
              </div>
              <FormikProvider value={formik}>
                <form onSubmit={formik.handleSubmit}>
                  <Field
                    className={`field ${
                      formik.isValid
                        ? formik.dirty || formik.values.content.length > 0
                          ? "success"
                          : "initial"
                        : "error"
                    } ${formik.dirty ? "" : "initial"}`}
                    id="content"
                    name="content"
                    placeholder="병원 방문 경험에 대한 자세한 후기를 다른 방문자들에게 공유해주세요."
                    as="textarea"
                    onChange={handleInput}
                  />
                </form>
              </FormikProvider>
            </InputWrapper>
          </Content>

          <Content>
            <div className="container">
              <div className="title-layout">
                <TitleWrapper>
                  <div className="title">사진을 올려주세요.</div>
                  <div className="optional">{"(선택)"}</div>
                </TitleWrapper>
                <div className="text-limit">
                  {imgFiles.length}장 / 최대 {MAX_IMAGE_NUMBER}장
                </div>
              </div>
            </div>
            <AttachImage
              imgFiles={imgFiles}
              setImgFiles={setImgFiles}
              imagesId={imagesId}
              setImagesId={setImagesId}
              isUploadingComplete={isUploadingComplete}
              setIsUploadingComplete={setIsUploadingComplete}
              maxImageNumber={MAX_IMAGE_NUMBER}
            />
          </Content>
        </div>
      </WriteReviewWrapper>
      <ModalBottom
        mode={mode}
        setMode={handleMode}
        onSwap={onSwap}
        disabled={!isValid()}
      />
    </FullModalBase>
  );
};

export default Detail;

const FaceIconsQuestions = styled.div`
  margin-top: 1rem;
  margin-bottom: 2.5rem;

  .face-container {
    display: flex;
    justify-content: space-between;
    padding: 0 1rem;

    & .inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }
  }
`;

const InputWrapper = styled.div`
  .text-limit {
    display: flex;
    justify-content: end;
    align-items: center;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    margin-top: 0.5rem;
    color: ${(props) => props.theme.colors.grey};

    &.initial {
      color: ${(props) => props.theme.colors.grey};
    }

    &.error {
      color: ${(props) => props.theme.colors.red};
    }

    &.success {
      color: ${(props) => props.theme.colors.purple};
    }
  }

  textarea {
    outline: none !important;
  }

  .field {
    width: 100%;
    height: 16rem;
    border-radius: 1rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    flex-grow: 1;
    padding: 1rem;
    resize: none;

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }

    &.initial {
      border: 1px solid ${(props) => props.theme.colors.grey};
    }

    &.error {
      border: 1px solid ${(props) => props.theme.colors.red};
    }

    &.success {
      border: 1px solid ${(props) => props.theme.colors.purple};
    }
  }
`;
