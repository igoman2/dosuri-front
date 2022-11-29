import theme from "@/styles/theme";
import styled from "@emotion/styled";
import Image from "next/image";
import React, { FC, useRef } from "react";
import UploadFileImage from "@/public/assets/upload-file.png";
import Content from "../Form/Content";
import InputForm from "../Form/InputForm";
import Button from "@/components/Button";
import FullModalBase from "@/components/Modal/FullModalBase";

interface IWriteReviewProps {
  isActive: boolean;
  onChangeActive: () => void;
}

const WriteReview: FC<IWriteReviewProps> = ({ isActive, onChangeActive }) => {
  const imageInput = useRef<HTMLInputElement>(null);

  const onCickImageUpload = () => {
    imageInput.current && imageInput.current.click();
  };

  const submitHandler = () => {
    console.log("질문 등록하기!");
  };
  return (
    <FullModalBase
      isActive={isActive}
      onClose={() => onChangeActive()}
      title="치료후기 쓰기 (1/3) - 기본정보"
    >
      <WriteReviewWrapper>
        <div>
          <Content>
            <div className="container">
              <TitleWrapper>
                <div className="title">방문하신 병원을 알려주세요.</div>
                <div className="required">{"(필수)"}</div>
              </TitleWrapper>
            </div>

            <InputForm />
          </Content>

          <Content>
            <div className="container">
              <div className="title-layout">
                <TitleWrapper>
                  <div className="title">사진을 올려주세요.</div>
                  <div className="optional">{"(선택)"}</div>
                </TitleWrapper>
                <div className="text-limit">0장 / 최대 10장</div>
              </div>
            </div>

            <input type="file" style={{ display: "none" }} ref={imageInput} />
            <Image
              className="upload-image"
              src={UploadFileImage}
              width={130}
              height={130}
              alt="업로드 이미지 버튼"
              onClick={onCickImageUpload}
            />
          </Content>
        </div>
        <ButtonWrapper>
          <Button
            text="질문 등록하기"
            width="50%"
            backgroundColor={theme.colors.purple_light}
            onClick={submitHandler}
          />
        </ButtonWrapper>
      </WriteReviewWrapper>
    </FullModalBase>
  );
};

export default WriteReview;

const WriteReviewWrapper = styled.div`
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
    color: ${(props) => props.theme.colors.grey};
    margin-top: 0.5rem;
  }

  .field {
    width: 32rem;
    height: 16rem;
    border-radius: 1rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    flex-grow: 1;
    padding: 1rem;

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
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
