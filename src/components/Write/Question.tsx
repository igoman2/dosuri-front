import * as Yup from "yup";

import { A11y, Scrollbar } from "swiper";
import { Field, FormikProvider, useFormik } from "formik";
import React, { FC, FormEvent, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { BeatLoader } from "react-spinners";
import Button from "../Button";
import Content from "./Form/Content";
import FullModalBase from "../Modal/FullModalBase";
import Icon from "@/util/Icon";
import Image from "next/image";
import UploadFileImage from "@/public/assets/upload-file.png";
import axios from "axios";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useRegisterReview } from "@/hooks/service/useRegisterReview";

const MAX_COUNT = 10;

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
  const imageInput = useRef<HTMLInputElement>(null);
  const [imgFiles, setImgFiles] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);
  const [imagesId, setImagesId] = useState<string[]>([]);
  const [isUploadingComplete, setIsUploadingComplete] = useState(true);
  const { mutate } = useRegisterReview();
  const onCickImageUpload = () => {
    imageInput.current && imageInput.current.click();
  };

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

  const upload = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const resp = await axios({
        headers: {
          "Content-Type": "multipart/form-data",
        },
        url: `https://api.dosuri.site/src`, // 파일 업로드 요청 URL
        method: "POST",
        data: formData,
        timeout: 10000,
      });

      return resp.data.attachment_uuid;
    } catch (e) {
      throw e;
    }
  };

  const getUploadedImagesId = async (uploaded: File[]) => {
    Promise.all([...uploaded.map((file) => upload(file))])
      .then((uuids) => {
        setImagesId(uuids);
        previewFiles(Array.prototype.slice.call(uploaded));
        setIsUploadingComplete(true);
      })
      // TODO: sentry로 throw
      .catch((err) => {
        setIsUploadingComplete(true);
        alert("업로드에 실패했습니다.");
      });
  };

  const handleImageUpload = (e: FormEvent<HTMLInputElement>) => {
    setIsUploadingComplete(false);

    const target = e.target as HTMLInputElement;
    const fileArr = Array.prototype.slice.call(target.files);
    const uploaded = [...uploadedFiles];

    target.value = "";

    if (isFilesExceedLimit(fileArr, uploaded)) {
      return;
    }

    setUploadedFiles(uploaded);
    getUploadedImagesId(uploaded);
  };

  const isFilesExceedLimit = (fileArr: File[], uploaded: File[]) => {
    let limitExceeded = false;

    fileArr.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT || imgFiles.length > MAX_COUNT) {
          alert(`최대 ${MAX_COUNT}장까지 업로드 가능합니다.`);
          setFileLimit(false);
          setIsUploadingComplete(true);
          limitExceeded = true;
          return true;
        }
      }
    });

    return limitExceeded;
  };

  const previewFiles = (fileArr: File[]) => {
    const fileURLs: string[] = [];

    fileArr.forEach((file, i) => {
      let reader = new FileReader();
      reader.onload = () => {
        fileURLs[i] = reader.result as string;
        setImgFiles([...fileURLs]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDeleteUploadedImate = (index: number) => {
    setImgFiles((prev) => {
      const tmp = [...prev];
      tmp.splice(index, 1);
      return tmp;
    });
    setUploadedFiles((prev) => {
      const tmp = [...prev];
      tmp.splice(index, 1);
      return tmp;
    });
    setImagesId((prev) => {
      const tmp = [...prev];
      tmp.splice(index, 1);
      return tmp;
    });
  };

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

            {imgFiles ? (
              <SwiperWrapper>
                <Swiper
                  watchSlidesProgress={true}
                  scrollbar={{ draggable: true }}
                  modules={[Scrollbar, A11y]}
                  slidesPerView={2}
                  spaceBetween={20}
                  initialSlide={0}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{ delay: 3000 }}
                >
                  {!isUploadingComplete && (
                    <SpinnerWrapper>
                      <BeatLoader color={theme.colors.purple} />
                    </SpinnerWrapper>
                  )}

                  <SwiperSlide key={"attach"}>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      ref={imageInput}
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                    <Image
                      className="upload-image"
                      src={UploadFileImage}
                      width={130}
                      height={130}
                      alt="업로드 이미지 버튼"
                      onClick={onCickImageUpload}
                    />
                  </SwiperSlide>

                  {imgFiles.map((image, i) => (
                    <SwiperSlide key={i}>
                      <DeleteImageIconWrapper
                        css={{
                          zIndex: 1000,
                        }}
                        onClick={() => {
                          handleDeleteUploadedImate(i);
                        }}
                      >
                        <Icon name="delete" />
                      </DeleteImageIconWrapper>
                      <Image
                        css={{
                          zIndex: 100,
                        }}
                        className="upload-image"
                        width={130}
                        height={130}
                        src={image}
                        alt="preview"
                        objectFit="contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperWrapper>
            ) : (
              <>
                <input
                  type="file"
                  style={{ display: "none" }}
                  ref={imageInput}
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
                <Image
                  className="upload-image"
                  src={UploadFileImage}
                  width={130}
                  height={130}
                  alt="업로드 이미지 버튼"
                  onClick={onCickImageUpload}
                />
              </>
            )}
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

const SwiperWrapper = styled.div`
  .swiper-slide {
    width: 13rem !important;
  }
`;

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

const DeleteImageIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
