import React, { Dispatch, FC, useEffect, useState } from "react";
import { modalContentState, modalState } from "@/components/Modal/store";
import { useRecoilState, useSetRecoilState } from "recoil";

import AttachImage from "./AttachImage";
import BillExamplesImage from "@/public/assets/bill-examples.png";
import Checkbox from "@/components/UI/Checkbox";
import Content from "../Form/Content";
import FullModalBase from "@/components/Modal/FullModalBase";
import Icon from "@/util/Icon";
import Image from "next/image";
import { ModalBottom } from "./ModalBottom";
import QuestionMarkIcon from "@/public/assets/question-mark.png";
import { TitleWrapper } from "@/components/UI/emotion/Review/TitleWrapper";
import { WriteReviewWrapper } from "@/components/UI/emotion/Review/WriteReviewWrapper";
import { createReviewState } from "./store";
import styled from "@emotion/styled";
import { useRegisterReview } from "@/hooks/service/useRegisterReview";

interface IAuthProps {
  isActive: boolean;
  mode: number;
  setMode: Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onSwap: () => void;
}

const Auth: FC<IAuthProps> = ({ isActive, mode, setMode, onClose, onSwap }) => {
  const [reviewState, setReviewState] = useRecoilState(createReviewState);
  const [isWarnVisible, setIsWarnVisible] = useState(false);
  const [imgFiles, setImgFiles] = useState<string[]>(reviewState.authImages);
  const [imagesId, setImagesId] = useState<string[]>(
    reviewState.auth_attach.map((attach) => attach.attachment)
  );
  const [isUploadingComplete, setIsUploadingComplete] = useState(true);
  const [personalAgreement, setPersonalAgreement] = useState(
    reviewState.personal_agreement
  );
  const [sensitiveAgreement, setSensitiveAgreement] = useState(
    reviewState.sensitive_agreement
  );
  const setModalContent = useSetRecoilState(modalContentState);
  const setModalIsActive = useSetRecoilState(modalState);

  const { mutate } = useRegisterReview();

  const submitReview = () => {
    mutate(
      {
        article_type: "review",
        hospital: reviewState.hospital.uuid,
        content: reviewState.content,
        article_attachment_assoc: reviewState.article_attachment_assoc,
        article_keyword_assoc: reviewState.treatmentKeywords.map((keyword) => ({
          treatment_keyword: keyword.uuid,
        })),
        article_detail: {
          doctor_kindness: Number(reviewState.doctor_kindness),
          treatment_effect: Number(reviewState.treatment_effect),
          therapist_kindness: Number(reviewState.treatment_effect),
          staff_kindness: Number(reviewState.staff_kindness),
          clean_score: Number(reviewState.clean_score),
          cost: Number(reviewState.treatmentPrice),
          treat_count: Number(reviewState.treatmentCount),
        },
        article_auth: {
          sensitive_agreement: reviewState.sensitive_agreement,
          personal_agreement: reviewState.personal_agreement,
          status: "InComplete",
          auth_attachment_assoc: reviewState.auth_attach,
        },
      },
      {
        onSuccess: () => {
          setMode(3);
        },
        onError: () => {
          setModalContent({
            title: "후기 등록에 실패하였습니다.",
            content: ``,
            actionLeft: {
              text: "",
              action: () => {},
            },
            actionRight: {
              text: "확인",
              action: () => {
                setModalIsActive({ isActive: false });
              },
            },
          });
          setModalIsActive((prev) => ({
            action: () => {
              setModalIsActive((prev) => ({ ...prev, isActive: false }));
            },
            isActive: true,
          }));
        },
      }
    );
  };
  const handleWarnClick = () => {
    setIsWarnVisible((prev) => !prev);
  };

  const isValid = () => {
    return personalAgreement && sensitiveAgreement && isUploadingComplete;
  };

  useEffect(() => {
    setReviewState((prev) => ({
      ...prev,
      authImages: imgFiles,
    }));
  }, [imgFiles]);

  useEffect(() => {
    setReviewState((prev) => ({
      ...prev,
      personal_agreement: personalAgreement,
    }));
  }, [personalAgreement]);

  useEffect(() => {
    setReviewState((prev) => ({
      ...prev,
      sensitive_agreement: sensitiveAgreement,
    }));
  }, [sensitiveAgreement]);

  useEffect(() => {
    setReviewState((prev) => ({
      ...prev,
      auth_attach: imagesId.map((id) => ({
        attachment: id,
      })),
    }));
  }, [imagesId]);

  return (
    <FullModalBase
      isActive={isActive}
      onClose={onClose}
      title="치료후기 쓰기 (3/3) - 인증"
    >
      <WriteReviewWrapper>
        <div>
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
                도수리는 이용자분들께 최대한 정확한 정보만을 제공해 드리기 위해,
                실제 진료를 받은 리얼 후기를 수집하려 노력하고 있습니다.
                올려주신 후기와 인증 사진은 검수절차를 거쳐 등록됩니다. 동일한
                진료 내역에 대해서는 후기를 여러 건 올리더라도 1개만 등록됩니다.
              </div>
            </Warn>
          </Content>

          <Content>
            <Agreement>
              <div>
                <Checkbox
                  text="개인정보 수집 이용동의 (필수)"
                  value={personalAgreement}
                  onClick={() => {
                    setPersonalAgreement((prev) => !prev);
                  }}
                />
                <QuestionIconWrapper
                  css={{ paddingBottom: "0.2rem", marginLeft: "0.5rem" }}
                >
                  <Image src={QuestionMarkIcon} alt="도움말" />
                </QuestionIconWrapper>
              </div>
              <div>
                <Checkbox
                  text="민감정보 수집 이용동의 (필수)"
                  value={sensitiveAgreement}
                  onClick={() => {
                    setSensitiveAgreement((prev) => !prev);
                  }}
                />
                <QuestionIconWrapper
                  css={{ paddingBottom: "0.2rem", marginLeft: "0.5rem" }}
                >
                  <Image src={QuestionMarkIcon} alt="도움말" />
                </QuestionIconWrapper>
              </div>
            </Agreement>
          </Content>
        </div>
        <ModalBottom
          mode={mode}
          setMode={setMode}
          onSwap={onSwap}
          disabled={!isValid()}
          action={submitReview}
        />
      </WriteReviewWrapper>
    </FullModalBase>
  );
};

export default Auth;

const QuestionIconWrapper = styled.div`
  display: flex;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
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
