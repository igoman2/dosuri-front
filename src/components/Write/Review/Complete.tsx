import React, { Dispatch, FC } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import Button from "@/components/Button";
import { ButtonWrapper } from "@/components/UI/emotion/Review/ButtonWrapper";
import Content from "../Form/Content";
import FullModalBase from "@/components/Modal/FullModalBase";
import { TitleWrapper } from "@/components/UI/emotion/Review/TitleWrapper";
import { WriteReviewWrapper } from "@/components/UI/emotion/Review/WriteReviewWrapper";
import { createReviewState } from "./store";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

interface ICompleteProps {
  isActive: boolean;
  setMode: Dispatch<React.SetStateAction<number>>;
  onClose: () => void;
  onSwap: () => void;
}

const Complete: FC<ICompleteProps> = ({ isActive, setMode, onClose }) => {
  const reviewState = useRecoilValue(createReviewState);
  const resetReviewState = useResetRecoilState(createReviewState);

  return (
    <FullModalBase
      isActive={isActive}
      onClose={onClose}
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
                    인증 사진은 검수 작업을 거치며, 완료 시 1일 내 포인트가
                    지급됩니다.
                  </div>
                  <div className="information">
                    <div className="element">병원명</div>
                    <div className="detail">{reviewState.hospital.name}</div>
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
            onClick={() => {
              resetReviewState();
              onClose();
            }}
          />
        </ButtonWrapper>
      </WriteReviewWrapper>
    </FullModalBase>
  );
};

export default Complete;

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
