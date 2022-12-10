import React, { FC } from "react";

import Description from "../Description";
import { IHospitalInfo } from "@/mock/hospitals";
import Image from "next/image";
import SampleImage from "@/public/assets/sample.png";

export interface IHospitalCardProps {
  hospitalInfo: IHospitalInfo;
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
        src={SampleImage}
        // src={hospitalInfo.hospitalImage}
        width={90}
        height={90}
        alt="hospitalImage"
      />
      <Description hospitalInfo={hospitalInfo} size="md" />
    </div>
  );
};

export default HospitalCard;
