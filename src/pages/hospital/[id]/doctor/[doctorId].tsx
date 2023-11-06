import Button from "@/components/Button";
import DoctorCard from "@/components/Card/DoctorCard";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import { modalState, modalContentState } from "@/components/Modal/store";
import { useGetDoctorInfo } from "@/hooks/service/useGetDoctorInfo";
import { createReservation } from "@/service/apis/hospital";
import theme from "@/styles/theme";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import { NextPageContext } from "next";
import router from "next/router";
import React from "react";
import { useSetRecoilState } from "recoil";

interface IDoctorInformationProps {
  id: string;
  doctorId: string;
}

const DoctorInformation = ({ id, doctorId }: IDoctorInformationProps) => {
  const { doctorInfo } = useGetDoctorInfo({ doctorId });
  const theme = useTheme();
  const setNoticeModal = useSetRecoilState(modalState);
  const setNoticeModalContent = useSetRecoilState(modalContentState);
  const handleReservationClick = async () => {
    try {
      await createReservation({ hospital: id });
      setNoticeModal({ isActive: true });
      setNoticeModalContent({
        title: "",
        content: "예약이 신청되었습니다. 병원에서 곧 전화를 드립니다.",
        actionCancel: {
          text: "",
          action: () => {},
        },
        actionWarn: {
          text: "",
          action: () => {},
        },
        actionConfirm: {
          text: "확인",
          action: () => {
            setNoticeModal({ isActive: false });
            router.back();
          },
        },
      });
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <DoctorCard doctor={doctorInfo} isLink={false} />

      <div
        css={{
          marginTop: "2.5rem",
          fontSize: theme.fontSizes.lg,
          lineHeight: theme.lineHeights.lg,
          color: theme.colors.purple,
          fontWeight: 700,
        }}
      >
        경력정보
      </div>
      <div
        css={{
          marginTop: "1rem",
        }}
      >
        {doctorInfo.descriptions.map((e, i) => (
          <div
            key={e.description}
            css={{
              fontSize: theme.fontSizes.lg,
              lineHeight: theme.lineHeights.lg,
            }}
          >
            {e.description}
          </div>
        ))}
      </div>

      <div
        css={{
          marginTop: "2.5rem",
          fontSize: theme.fontSizes.lg,
          lineHeight: theme.lineHeights.lg,
          color: theme.colors.purple,
          fontWeight: 700,
        }}
      >
        진료항목
      </div>
      <div
        css={{
          display: "flex",
          gap: "1rem",
          marginTop: "1rem",
          flexWrap: "wrap",
        }}
      >
        {doctorInfo.keywords.map((e, i) => (
          <div
            key={e.keyword}
            css={{
              color: theme.colors.black,
              border: `0.1rem solid ${theme.colors.grey}`,
              padding: "1rem",
              borderRadius: "0.5rem",
              fontSize: theme.fontSizes.lg,
              lineHeight: theme.lineHeights.lg,
            }}
          >
            {e.keyword}
          </div>
        ))}
      </div>
      <SaleButtonWrapper>
        <Button
          text="도수치료 예약하기"
          width="100%"
          height="5.2rem"
          borderRadius="0.3rem"
          backgroundColor={theme.colors.purple_light}
          bold
          onClick={handleReservationClick}
        ></Button>
      </SaleButtonWrapper>
    </Layout>
  );
};

export default DoctorInformation;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { id, doctorId, tab } = query;
  return {
    props: {
      id,
      doctorId,
      tab: tab ?? "price",
    },
  };
};

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
  z-index: 50;
`;
