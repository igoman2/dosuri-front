import * as Yup from "yup";

import { Field, FormikProvider, useFormik } from "formik";
import React, { FC, useState } from "react";

import AttachImage from "./Review/AttachImage";
import Button from "../Button";
import Content from "./Form/Content";
import FullModalBase from "../Modal/FullModalBase";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useRegisterReview } from "@/hooks/service/useRegisterReview";

interface IWriteQeustionProps {
  isActive: boolean;
  onChangeActive: () => void;
  onClose: () => void;
}
const WriteQuesiton: FC<IWriteQeustionProps> = ({
  isActive,
  onChangeActive,
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
                  placeholder="궁금한거나 공유하고 싶은 내용을 다른 회원들에게 공유해주세요."
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
                  {imgFiles.length}장 / 최대 10장
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
            />
          </Content>
        </div>
        <ButtonWrapper>
          <Button
            text="질문 등록하기"
            height="5.2rem"
            width="50%"
            disabled={!(formik.isValid && formik.dirty && isUploadingComplete)}
            backgroundColor={theme.colors.purple_light}
            onClick={submitHandler}
            type="submit"
            bold
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
  justify-content: right;
`;
