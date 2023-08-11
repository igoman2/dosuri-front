import DoctorCard from "@/components/Card/DoctorCard";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import { useGetDoctorInfo } from "@/hooks/service/useGetDoctorInfo";
import { useTheme } from "@emotion/react";
import { NextPageContext } from "next";
import React from "react";

interface IDoctorInformationProps {
  doctorId: string;
}

const DoctorInformation = ({ doctorId }: IDoctorInformationProps) => {
  const { doctorInfo } = useGetDoctorInfo({ doctorId });
  const theme = useTheme();
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
    </Layout>
  );
};

export default DoctorInformation;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { doctorId, tab } = query;
  return {
    props: {
      doctorId,
      tab: tab ?? "price",
    },
  };
};
