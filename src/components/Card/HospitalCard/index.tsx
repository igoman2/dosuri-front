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
        display: "flex",
        marginTop: "1rem",
      }}
    >
      <div
        css={{
          minWidth: "9rem",
        }}
      >
        {hospitalInfo.attachments.length === 0 ? (
          <ImageFallback width="9rem" height="9rem" />
        ) : (
          <Image
            style={{
              borderRadius: "0.5rem",
            }}
            src={hospitalInfo.attachments[0]?.signed_path}
            width={90}
            height={90}
            alt="hospital-image"
          />
        )}
      </div>

      <Description hospitalInfo={hospitalInfo} size="md" />
    </div>
  );
};

export default HospitalCard;
