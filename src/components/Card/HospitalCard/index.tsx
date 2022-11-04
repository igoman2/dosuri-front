import { HospitalInfo } from "@/mock/hospitals";
import Image from "next/image";
import React, { FC } from "react";
import Description from "../Description";

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
