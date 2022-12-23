import React, { FC } from "react";

import Description from "../Description";
import { IHospitalInfoResult } from "@/service/types";
import Image from "next/image";
import ImageFallback from "@/components/UI/ImageFallback";

export interface IHospitalCardProps {
  hospitalInfo: IHospitalInfoResult;
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
      {hospitalInfo.images.length === 0 ? (
        <ImageFallback width="9rem" height="9rem" />
      ) : (
        <Image
          src={hospitalInfo.images[0]?.url}
          width={90}
          height={90}
          alt="hospital-image"
        />
      )}

      <Description hospitalInfo={hospitalInfo} size="md" />
    </div>
  );
};

export default HospitalCard;
