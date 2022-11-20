import theme from "@/styles/theme";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import Description from "../Description";

export interface DoctorInfo {
  id: number;
  title: string;
  location: string;
  reviewConut: number;
  thunbCount: number;
  recentReview: string | null;
  hospitalImage: StaticImageData; // 서버에서 받아오는거로 변경할 예정
}

export interface IDoctorCardProps {
  hospitalInfo: DoctorInfo;
}

const DoctorCard: FC<IDoctorCardProps> = ({ hospitalInfo }) => {
  return (
    <div>
      <div
        css={{
          minWidth: "9rem",
          display: "flex",
          marginTop: "2rem",
        }}
      >
        <Image
          style={{
            borderRadius: "50%",
          }}
          src={hospitalInfo.hospitalImage}
          width={90}
          height={90}
          alt="hospitalImage"
        />
        <Description hospitalInfo={hospitalInfo} size="lg" />
      </div>
      <div
        css={{
          marginTop: "1rem",
          fontSize: theme.fontSizes.md,
          lineHeight: theme.lineHeights.md,
        }}
      >
        <li>- 세브란스 병원 수련</li>
        <li>- 비수술 척추 치료 최고 의사 선정</li>
      </div>
    </div>
  );
};

export default DoctorCard;
