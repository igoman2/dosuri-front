import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";
import Description from "../Description";

export interface HospitalInfo {
  title: string;
  location: string;
  reviewConut: number;
  thunbCount: number;
  recentReview: ReactNode | string | null;
  hospitalImage: StaticImageData; // 서버에서 받아오는거로 변경할 예정
}

export interface IHospitalCardProps {
  hospitalInfo: HospitalInfo;
}

const HospitalCard: FC<IHospitalCardProps> = ({ hospitalInfo }) => {
  return (
    <div
      css={{
        minWidth: "9rem",
        display: "flex",
        marginTop: "1rem",
      }}
    >
      <Image
        src={hospitalInfo.hospitalImage}
        width={90}
        height={90}
        alt="hospitalImage"
      />
      <Description hospitalInfo={hospitalInfo} size="md" />
    </div>
  );
};

export default HospitalCard;
