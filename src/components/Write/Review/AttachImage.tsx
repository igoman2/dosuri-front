import { A11y, Scrollbar } from "swiper";
import React, { Dispatch, FC, FormEvent, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { BeatLoader } from "react-spinners";
import Icon from "@/util/Icon";
import Image from "next/image";
import UploadFileImage from "@/public/assets/upload-file.png";
import axios from "axios";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

interface IAttachImageProps {
  imgFiles: string[];
  setImgFiles: Dispatch<React.SetStateAction<string[]>>;
  imagesId: string[];
  setImagesId: Dispatch<React.SetStateAction<string[]>>;
  isUploadingComplete: boolean;
  setIsUploadingComplete: Dispatch<React.SetStateAction<boolean>>;
  maxImageNumber: number;
}

const AttachImage: FC<IAttachImageProps> = ({
  imgFiles,
  setImgFiles,
  imagesId,
  setImagesId,
  isUploadingComplete,
  setIsUploadingComplete,
  maxImageNumber,
}) => {
  const imageInput = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [fileLimit, setFileLimit] = useState(false);

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
        reset();
        alert("업로드에 실패했습니다.");
      });
  };

  const reset = () => {
    setImgFiles([]);
    setUploadedFiles([]);
    setImagesId([]);
  };

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

  const onCickImageUpload = () => {
    imageInput.current && imageInput.current.click();
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
        if (uploaded.length === maxImageNumber) setFileLimit(true);
        if (
          uploaded.length > maxImageNumber ||
          imgFiles.length > maxImageNumber
        ) {
          alert(`최대 ${maxImageNumber}장까지 업로드 가능합니다.`);
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
    <div
      css={{
        position: "relative",
      }}
    >
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
    </div>
  );
};

export default AttachImage;

const SwiperWrapper = styled.div`
  .swiper-slide {
    width: 13rem !important;
  }
`;

const DeleteImageIconWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 60px; // 사용자 설정
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
`;
