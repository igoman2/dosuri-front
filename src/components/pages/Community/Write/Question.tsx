import * as Yup from "yup";

import { Field, FormikProvider, useFormik } from "formik";
import React, { FC, useState } from "react";

import AttachImage from "./Review/AttachImage";
import Button from "../../../Button";
import Content from "./Form/Content";
import FullModalBase from "../../../Modal/FullModalBase";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useRegisterReview } from "@/hooks/service/useRegisterReview";

const MAX_IMAGE_NUMBER = 10;

interface IWriteQeustionProps {
  isActive: boolean;
  onChangeActive: () => void;
  onSwap: () => void;
  onClose: () => void;
}
const WriteQuesiton: FC<IWriteQeustionProps> = ({
  isActive,
  onChangeActive,
  onSwap,
  onClose,
}) => {
  const [imgFiles, setImgFiles] = useState<string[]>([]);
  const [imagesId, setImagesId] = useState<string[]>([]);
  const [isUploadingComplete, setIsUploadingComplete] = useState(true);
  const { mutate } = useRegisterReview();

  interface MyFormValues {
    content: string;
  }

  const initialValues: MyFormValues = {
    content: "",
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      content: Yup.string().min(20),
    }),
    onSubmit: () => {
      mutate(
        {
          article_type: "question",
          content: formik.values.content,
          article_attachment_assoc: imagesId.map((id) => ({
            attachment: id,
          })),
        },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    },
  });

  const submitHandler = () => {
    formik.handleSubmit();
  };

  // TODO: Promise.all => Promise.allSettled 로 개선
  // Promise.allSettled(postArr)
  //   .then((result) => {
  //     // 실패한 것들만 필터링해서 다시 시도
  //     result.forEach(async (val, index) => {
  //       if (val.status === "rejected") {
  //         await postArr[index]; // 실패한 요청 다시 ajax
  //       }
  //     });
  //   })
  //   .catch((err) => console.log(err));
  const button = css`
    width: 16rem;
    font-weight: 700;
    color: ${theme.colors.purple};
    background-color: ${theme.colors.white};
    font-size: ${theme.fontSizes.lg};
    line-height: ${theme.lineHeights.lg};
    box-shadow: none;
    border: none;
    outline: 0;
    cursor: pointer;
  `;
  return (
    <FullModalBase
      isActive={isActive}
      onClose={() => onChangeActive()}
      title="질문/상담 쓰기"
    >
      <WriteQuesitonWrapper>
        <div>
          <Content>
            <div className="container">
              <TitleWrapper>
                <div className="title">질문/상담 내용을 적어주세요.</div>
                <div className="required">{"(필수)"}</div>
              </TitleWrapper>

              <div
                className={`text-limit ${
                  formik.isValid
                    ? formik.dirty
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
                      ? formik.dirty
                        ? "success"
                        : "initial"
                      : "error"
                  } ${formik.dirty ? "" : "initial"}`}
                  id="content"
                  name="content"
                  placeholder="궁금하거나 공유하고 싶은 내용을 다른 회원들에게 공유해주세요."
                  as="textarea"
                />
              </form>
            </FormikProvider>
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
        <ButtonWrapper>
          <button css={button} onClick={onSwap}>
            <div>질문/상담 말고</div>
            <div>치료후기 글 쓰러 가기</div>
          </button>

          <Button
            bold
            borderRadius="0.3rem"
            height="5.2rem"
            text="질문 등록하기"
            type="submit"
            width="14rem"
            backgroundColor={theme.colors.purple_light}
            onClick={submitHandler}
            disabled={!(formik.isValid && formik.dirty && isUploadingComplete)}
          />
        </ButtonWrapper>
      </WriteQuesitonWrapper>
    </FullModalBase>
  );
};

export default WriteQuesiton;

const WriteQuesitonWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .container {
    margin-bottom: 1rem;
  }

  .title-layout {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

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

  .upload-image {
    cursor: pointer;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: end;
  gap: 0.5rem;

  .title {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
  }

  .required {
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    color: ${(props) => props.theme.colors.purple};
    margin-bottom: 0.2rem;
  }

  .optional {
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    color: ${(props) => props.theme.colors.grey};
    margin-bottom: 0.2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
  position: -webkit-sticky; /* 사파리 브라우저 지원 */
  position: sticky;
  bottom: -2rem;
  padding: 1rem 0 1rem 0;
  background: white;
  z-index: 100;
`;
