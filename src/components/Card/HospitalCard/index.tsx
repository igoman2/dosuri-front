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
        src={hospitalInfo.images[0]?.url ?? SampleImage}
        width={90}
        height={90}
        alt="hospital-image"
      />
      <Description hospitalInfo={hospitalInfo} size="md" />
    </div>
  );
};

export default HospitalCard;
