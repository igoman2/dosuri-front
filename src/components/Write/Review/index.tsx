import React, { FC, useRef, useState } from "react";

import BillExamplesImage from "@/public/assets/bill-examples.png";
import Button from "@/components/Button";
import Checkbox from "@/components/UI/Checkbox";
import CoinPurpleIcon from "@/public/assets/coin-purple.png";
import Content from "../Form/Content";
import FullModalBase from "@/components/Modal/FullModalBase";
import HappyFaceIcon from "@/public/assets/happy-face.png";
import Icon from "@/util/Icon";
import Image from "next/image";
import InputForm from "../Form/InputForm";
import Link from "next/link";
import NeutralFaceIcon from "@/public/assets/neutral-face.png";
import QuestionMarkIcon from "@/public/assets/question-mark.png";
import SadFaceIcon from "@/public/assets/sad-face.png";
import SelectForm from "../Form/SelectForm";
import UploadFileImage from "@/public/assets/upload-file.png";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

interface IWriteReviewProps {
  isActive: boolean;
  onChangeActive: () => void;
}

const WriteReview: FC<IWriteReviewProps> = ({ isActive, onChangeActive }) => {
  const [mode, setMode] = useState(0);
  const [isWarnVisible, setIsWarnVisible] = useState(false);
  const [searchType, setSearchType] = useState("");
  const imageInput = useRef<HTMLInputElement>(null);

  const handleHospitalSelect = () => {
    setSearchType("hospital");
  };

  const onCickImageUpload = () => {
    imageInput.current && imageInput.current.click();
  };

  const handleWarnClick = () => {
    setIsWarnVisible((prev) => !prev);
  };

  const ModalBottom = () => (
    <ButtonWrapper>
      <div className="top">
        <Button
          text="치료후기 말고 질문/상담 글 쓰러 가기"
          backgroundColor={theme.colors.white}
          color={theme.colors.purple}
          bold
          css={{ marginBottom: "3.5rem" }}
        />
      </div>
      <div className="bottom">
        <Button
          css={{ visibility: mode === 0 ? "hidden" : "visible" }}
          bold
          borderRadius="0.3rem"
          text="이전"
          width="50%"
          backgroundColor={theme.colors.white}
          color={theme.colors.purple}
          border={`0.1rem solid ${theme.colors.purple}`}
          onClick={() => setMode((prev) => prev - 1)}
        />
        <Button
          bold
          borderRadius="0.3rem"
          text="다음"
          width="50%"
          backgroundColor={theme.colors.purple_light}
          onClick={() => setMode((prev) => prev + 1)}
        />
      </div>
    </ButtonWrapper>
  );

  const renderWithMode = () => {
    switch (mode) {
      case 0:
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
                  <div onClick={handleHospitalSelect}>
                    <SelectForm />
                  </div>
                </Content>

                <Content>
                  <div className="container">
                    <TitleWrapper>
                      <div className="title">어떤 치료를 받으셨나요?</div>
                      <div className="required">{"(필수)"}</div>
                    </TitleWrapper>
                    <SelectForm />
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
                        <InputForm
                          css={{ width: "12rem" }}
                          placeholder="원 단위로 입력"
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
                        <InputForm
                          css={{ width: "12rem" }}
                          placeholder="숫자 입력"
                        />
                      </div>
                      <div className="unit">회</div>
                    </div>
                  </div>
                </Content>
              </div>
              <ModalBottom />
            </WriteReviewWrapper>
          </FullModalBase>
        );
      case 1:
        return (
          <FullModalBase
            isActive={isActive}
            onClose={() => onChangeActive()}
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

                    <FaceIconsQuestions>
                      <div className="question">
                        진료와 치료의 효과는 좋았나요?
                      </div>
                      <div className="face-container">
                        <div className="inner">
                          <Image
                            src={SadFaceIcon}
                            width={44}
                            height={44}
                            alt="sad-face-icon"
                          />
                          <div>별로였어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={NeutralFaceIcon}
                            width={44}
                            height={44}
                            alt="neutral-face-icon"
                          />
                          <div>보통이었어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={HappyFaceIcon}
                            width={44}
                            height={44}
                            alt="happy-face-icon"
                          />
                          <div>좋았어요</div>
                        </div>
                      </div>
                    </FaceIconsQuestions>

                    <FaceIconsQuestions>
                      <div className="question">
                        진료와 치료의 효과는 좋았나요?
                      </div>
                      <div className="face-container">
                        <div className="inner">
                          <Image
                            src={SadFaceIcon}
                            width={44}
                            height={44}
                            alt="sad-face-icon"
                          />
                          <div>별로였어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={NeutralFaceIcon}
                            width={44}
                            height={44}
                            alt="neutral-face-icon"
                          />
                          <div>보통이었어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={HappyFaceIcon}
                            width={44}
                            height={44}
                            alt="happy-face-icon"
                          />
                          <div>좋았어요</div>
                        </div>
                      </div>
                    </FaceIconsQuestions>

                    <FaceIconsQuestions>
                      <div className="question">의사는 친절했나요?</div>
                      <div className="face-container">
                        <div className="inner">
                          <Image
                            src={SadFaceIcon}
                            width={44}
                            height={44}
                            alt="sad-face-icon"
                          />
                          <div>별로였어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={NeutralFaceIcon}
                            width={44}
                            height={44}
                            alt="neutral-face-icon"
                          />
                          <div>보통이었어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={HappyFaceIcon}
                            width={44}
                            height={44}
                            alt="happy-face-icon"
                          />
                          <div>좋았어요</div>
                        </div>
                      </div>
                    </FaceIconsQuestions>

                    <FaceIconsQuestions>
                      <div className="question">치료사는 친절했나요?</div>
                      <div className="face-container">
                        <div className="inner">
                          <Image
                            src={SadFaceIcon}
                            width={44}
                            height={44}
                            alt="sad-face-icon"
                          />
                          <div>별로였어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={NeutralFaceIcon}
                            width={44}
                            height={44}
                            alt="neutral-face-icon"
                          />
                          <div>보통이었어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={HappyFaceIcon}
                            width={44}
                            height={44}
                            alt="happy-face-icon"
                          />
                          <div>좋았어요</div>
                        </div>
                      </div>
                    </FaceIconsQuestions>

                    <FaceIconsQuestions>
                      <div className="question">병원 스탭은 친절했나요?</div>
                      <div className="face-container">
                        <div className="inner">
                          <Image
                            src={SadFaceIcon}
                            width={44}
                            height={44}
                            alt="sad-face-icon"
                          />
                          <div>별로였어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={NeutralFaceIcon}
                            width={44}
                            height={44}
                            alt="neutral-face-icon"
                          />
                          <div>보통이었어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={HappyFaceIcon}
                            width={44}
                            height={44}
                            alt="happy-face-icon"
                          />
                          <div>좋았어요</div>
                        </div>
                      </div>
                    </FaceIconsQuestions>

                    <FaceIconsQuestions>
                      <div className="question">
                        병원 시설은 청결하고 위생적이었나요?
                      </div>
                      <div className="face-container">
                        <div className="inner">
                          <Image
                            src={SadFaceIcon}
                            width={44}
                            height={44}
                            alt="sad-face-icon"
                          />
                          <div>별로였어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={NeutralFaceIcon}
                            width={44}
                            height={44}
                            alt="neutral-face-icon"
                          />
                          <div>보통이었어요</div>
                        </div>
                        <div className="inner">
                          <Image
                            src={HappyFaceIcon}
                            width={44}
                            height={44}
                            alt="happy-face-icon"
                          />
                          <div>좋았어요</div>
                        </div>
                      </div>
                    </FaceIconsQuestions>
                  </div>
                </Content>

                <Content>
                  <div className="container">
                    <div className="title-layout">
                      <TitleWrapper>
                        <div className="title">
                          치료 후기를 자세히 적어주세요.
                        </div>
                        <div className="required">{"(필수)"}</div>
                      </TitleWrapper>
                    </div>
                    <div className="text-limit">0자 / 최소 20자</div>
                  </div>
                  <div className="input-large">
                    <InputForm
                      placeholder="병원 방문 경험에 대한 자세한 후기를 다른 방문자들에게 공유해주세요."
                      type="textarea"
                    />
                  </div>
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

                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={imageInput}
                  />
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
              <ModalBottom />
            </WriteReviewWrapper>
          </FullModalBase>
        );
      case 2:
        return (
          <FullModalBase
            isActive={isActive}
            onClose={() => onChangeActive()}
            title="치료후기 쓰기 (3/3) - 인증"
          >
            <WriteReviewWrapper>
              <div>
                <Content>
                  <div className="container">
                    <div className="title-layout">
                      <TitleWrapper>
                        <div className="title">치료를 인증해주세요.</div>
                        <div className="optional">{"(선택)"}</div>
                      </TitleWrapper>
                      <div className="text-limit">1장 / 최대 10장</div>
                    </div>
                  </div>
                  <div className="banner-layout">
                    <div className="banner">
                      <Image
                        src={CoinPurpleIcon}
                        alt="coin-icon"
                        width={20}
                        height={20}
                      />
                      <div className="banner-text">
                        인증 완료하면 도수리 포인트
                        <span className="highlight">1,000P</span>
                        지급
                      </div>
                    </div>

                    <Link href="https://jade-grill-d5b.notion.site/4e50154c10c841b5a1eb9a8aac1355aa">
                      <a target="_blank" rel="noopener noreferrer">
                        <QuestionIconWrapper css={{ marginLeft: "0.4rem" }}>
                          <Image src={QuestionMarkIcon} alt="도움말" />
                        </QuestionIconWrapper>
                      </a>
                    </Link>
                  </div>

                  <input
                    type="file"
                    style={{ display: "none" }}
                    ref={imageInput}
                  />
                  <Image
                    className="upload-image"
                    src={UploadFileImage}
                    width={130}
                    height={130}
                    alt="업로드 이미지 버튼"
                    onClick={onCickImageUpload}
                  />
                </Content>

                <Content>
                  <div className="question">인증 가능한 사진 종류</div>

                  <div className="bill-example">
                    <Image src={BillExamplesImage} alt="영수증 예시" />
                  </div>

                  <Warn>
                    <div className="warn-wrapper" onClick={handleWarnClick}>
                      <span className="warn-title">시술 인증 시 유의사항</span>
                      <Icon
                        name="arrow"
                        width="14"
                        height="14"
                        stroke="black"
                        strokeWidth="4"
                        css={{
                          transform: isWarnVisible
                            ? "rotate(-90deg)"
                            : "rotate(90deg)",
                        }}
                      />
                    </div>
                    <div
                      className="warn-description"
                      css={{ display: isWarnVisible ? "none" : "" }}
                    >
                      도수리는 이용자분들께 최대한 정확한 정보만을 제공해 드리기
                      위해, 실제 진료를 받은 리얼 후기를 수집하려 노력하고
                      있습니다. 올려주신 후기와 인증 사진은 검수절차를 거쳐
                      등록됩니다. 동일한 진료 내역에 대해서는 후기를 여러 건
                      올리더라도 1개만 등록됩니다.
                    </div>
                  </Warn>
                </Content>

                <Content>
                  <Agreement>
                    <div>
                      <Checkbox text="개인정보 수집 이용동의 (필수)" />
                      <QuestionIconWrapper
                        css={{ paddingBottom: "0.2rem", marginLeft: "0.5rem" }}
                      >
                        <Image src={QuestionMarkIcon} alt="도움말" />
                      </QuestionIconWrapper>
                    </div>
                    <div>
                      <Checkbox text="민감정보 수집 이용동의 (필수)" />
                      <QuestionIconWrapper
                        css={{ paddingBottom: "0.2rem", marginLeft: "0.5rem" }}
                      >
                        <Image src={QuestionMarkIcon} alt="도움말" />
                      </QuestionIconWrapper>
                    </div>
                  </Agreement>
                </Content>
              </div>
              <ModalBottom />
            </WriteReviewWrapper>
          </FullModalBase>
        );
      case 3:
        return (
          <FullModalBase
            isActive={isActive}
            onClose={() => onChangeActive()}
            title="치료후기 쓰기 - 완료"
          >
            <WriteReviewWrapper>
              <div>
                <Content>
                  <div className="container">
                    <TitleWrapper>
                      <div className="title">치료후기가 등록되었습니다.</div>
                    </TitleWrapper>
                    <Content>
                      <ReviewComplete>
                        <div className="notification">
                          인증 사진은 검수 작업을 거치며, 완료 시 1일 내
                          포인트가 지급됩니다.
                        </div>
                        <div className="information">
                          <div className="element">병원명</div>
                          <div className="detail">베이드정형외과의원</div>
                        </div>
                        <div className="information">
                          <div className="element">인증여부</div>
                          <div className="detail">인증함</div>
                        </div>
                      </ReviewComplete>
                    </Content>
                  </div>
                </Content>
              </div>
              <ButtonWrapper>
                <Button
                  borderRadius="0.3rem"
                  bold
                  text="도수톡으로 돌아가기"
                  width="100%"
                  backgroundColor={theme.colors.white}
                  color={theme.colors.purple}
                  onClick={() => setMode((prev) => prev + 1)}
                />
              </ButtonWrapper>
            </WriteReviewWrapper>
          </FullModalBase>
        );
    }
  };

  return <>{renderWithMode()}</>;
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

  .input-small {
    .field {
      width: 12rem;
      border-radius: 0.5rem;
      border: 0.1rem solid ${(props) => props.theme.colors.grey};
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};
      flex-grow: 1;
      padding: 1rem;

      &::placeholder {
        color: ${(props) => props.theme.colors.grey};
      }
    }
  }

  .input-large {
    .field {
      width: 100%;
      min-height: 16rem;
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
    }
  }

  .upload-image {
    cursor: pointer;
  }

  .banner-layout {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    margin-top: -0.5rem;
    margin-bottom: 1rem;
  }

  .banner {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(152, 143, 255, 0.3);
    border-radius: 2rem;
    flex-grow: 1;
    padding: 0.5rem 1rem;
    gap: 0.5rem;

    &-text {
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};

      .highlight {
        color: ${(props) => props.theme.colors.purple};
      }
    }
  }

  .question {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }

  .bill-example {
    margin: 1rem 0 1.5rem;
  }

  .input-form-layout {
    display: flex;
    align-items: bottom;
    gap: 1rem;
    margin-top: 1rem;

    .unit {
      display: flex;
      align-items: center;
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};
      font-weight: 700;
    }
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
  .top {
    display: flex;
    justify-content: center;
  }

  .bottom {
    display: flex;
    gap: 4rem;
    justify-content: right;
  }
`;

const FaceIconsQuestions = styled.div`
  margin-top: 1rem;
  margin-bottom: 2.5rem;

  .face-container {
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;

    & .inner {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }
  }
`;

const Warn = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.grey_light};

  .warn-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .warn-title {
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
  }

  .warn-description {
    margin-top: 0.7rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
  }
`;

const Agreement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  div {
    display: flex;
    align-items: center;
  }
`;

const QuestionIconWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
`;

const ReviewComplete = styled.div`
  .notification {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    margin-top: 1rem;
    margin-bottom: 2rem;
  }

  .information {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    margin-bottom: 2.5rem;

    .element {
      color: ${(props) => props.theme.colors.purple};
      font-weight: 700;
    }
  }
`;
