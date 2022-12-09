import Button from "@/components/Button";
import Layout from "@/components/Layout";
import HeaderInsurance from "@/components/Layout/Header/Depth/HeaderInsurance";
import styled from "@emotion/styled";
import React from "react";
import WithInsuranceImage from "@/public/assets/with-insurance.png";
import WithoutInsuranceImage from "@/public/assets/without-insurance.png";
import ArrowBottomIcon from "@/public/assets/bordered-arrow-bottom.png";
import Image from "next/image";
import { useTheme } from "@emotion/react";
import Link from "next/link";

const InsuranceRegister = () => {
  const theme = useTheme();
  return (
    <Layout header={<HeaderInsurance />} footer={false}>
      <Content>
        <div>
          <div className="title">실손보험 없이 도수치료 받으시려구요?</div>
          <div className="sub-title">
            <div>보험 가입하고 치료 받으면</div>
            <div>
              <span className="red">최대 70% 까지 </span>
              치료비가 싸져요!
            </div>
          </div>

          <Compare>
            <div className="inside">
              <div>보험 없을 때</div>
              <Image src={WithoutInsuranceImage} alt="without-insurance" />
            </div>
            <div className="inside">
              <div className="with-insurance">보험 있을 때</div>
              <Image src={WithInsuranceImage} alt="with-insurance" />
            </div>
          </Compare>
          <Bottom>
            <Image
              src={ArrowBottomIcon}
              width={18}
              height={18}
              alt="arrow-bottom-icon"
            />

            <div className="highlight">
              <div>보험 있을 때</div>
              <div>93만원 절약</div>
            </div>
            <ul className="description">
              <li>
                위 내용은 이해를 돕기위한 예시이며 치료비와 보험료는 가입자에
                따라 달라질 수 있습니다.
              </li>
            </ul>
          </Bottom>
        </div>

        <ButtonWrapper>
          <Link href="/insurance-register">
            <a>
              <Button
                text="터치 한번으로 실손보험 상담 신청하기"
                width="100%"
                backgroundColor={theme.colors.purple_light}
              />
            </a>
          </Link>
        </ButtonWrapper>
      </Content>
    </Layout>
  );
};

export default InsuranceRegister;

const Compare = styled.div`
  display: flex;
  justify-content: space-around;
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: ${(props) => props.theme.lineHeights.lg};
  font-weight: 700;
  margin-top: 4rem;

  .inside {
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
      margin-bottom: 1rem;
    }
  }

  .with-insurance {
    color: ${(props) => props.theme.colors.purple};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .title {
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
    margin-top: 0.5rem;
  }

  .sub-title {
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
    font-weight: 700;
    margin-top: 1.5rem;

    .red {
      color: ${(props) => props.theme.colors.red};
    }
  }
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.8rem;

  .highlight {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    color: ${(props) => props.theme.colors.red};
    font-weight: 700;
    margin-top: 0.8rem;
  }

  .description {
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};
    color: ${(props) => props.theme.colors.grey};
    margin-top: 2rem;

    li {
      list-style: disc inside;
      text-indent: -20px;
      padding-left: 20px;
    }
  }
`;

const ButtonWrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
`;
