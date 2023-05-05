import { modalContentState, modalState } from "@/components/Modal/store";

import ArrowBottomIcon from "@/public/assets/bordered-arrow-bottom.png";
import Button from "@/components/Button";
import HeaderInsurance from "@/components/Layout/Header/Depth/HeaderInsurance";
import Image from "next/image";
import Layout from "@/components/Layout";
import { NextSeo } from "next-seo";
import React from "react";
import WithInsuranceImage from "@/public/assets/with-insurance.png";
import WithoutInsuranceImage from "@/public/assets/without-insurance.png";
import { applyInsurance } from "@/service/apis/user";
import styled from "@emotion/styled";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { useTheme } from "@emotion/react";

const InsuranceRegister = () => {
  const theme = useTheme();
  const router = useRouter();
  const setModalContent = useSetRecoilState(modalContentState);
  const setModalIsActive = useSetRecoilState(modalState);

  const { mutate } = useMutation({
    mutationFn: () => {
      return applyInsurance();
    },
    onSuccess: () => {
      router.replace("/insurance-register/confirm");
    },
    onError: (e) => {
      setModalIsActive({ isActive: true });

      setModalContent({
        title: "회원가입 페이지로 이동합니다.",
        content: `보험 신청을 위해선 추가 회원 정보가 필요해요`,
        actionCancel: {
          text: "",
          action: () => {},
        },
        actionWarn: {
          text: "확인",
          action: () => {
            setModalIsActive({ isActive: false });
            router.push("/register");
          },
        },
        actionConfirm: {
          text: "",
          action: () => {},
        },
      });
    },
  });

  const applyInsuranceHandler = () => {
    mutate();
  };
  return (
    <Layout header={<HeaderInsurance />} footer={false}>
      <NextSeo
        title="실손보험 가입 | 도수리-도수치료 리얼후기"
        canonical="https://www.dosuri.site/insurance-register"
        openGraph={{
          url: "https://www.dosuri.site/insurance-register",
        }}
      />
      <Content>
        <div className="inner">
          <div className="title">실손보험 없이 도수치료 받으시려구요?</div>
          <div className="sub-title">
            <div>보험 가입하고 치료 받으면</div>
            <div>
              <span className="red">최대 70% </span>
              까지 치료비가 싸져요!
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
      </Content>
      <SaleButtonWrapper>
        <Button
          text="터치 한번으로 실손보험 상담 신청하기"
          width="100%"
          borderRadius="0.3rem"
          height="5.2rem"
          backgroundColor={theme.colors.purple_light}
          bold
          onClick={applyInsuranceHandler}
        />
      </SaleButtonWrapper>
    </Layout>
  );
};

export default InsuranceRegister;

const SaleButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 2rem;
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
`;

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

  .inner {
    margin-bottom: 10.6rem;
  }

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
