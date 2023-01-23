import { IGoodPriceHospitals, IHospitalInfoResult } from "@/service/types";
import React, { FC } from "react";

import Description from "../Description";
import DescriptionPrice from "../DescriptionPrice";
import Image from "next/image";
import ImageFallback from "@/components/UI/ImageFallback";
import styled from "@emotion/styled";

export interface IHospitalCardProps {
  hospitalInfo: IHospitalInfoResult | IGoodPriceHospitals;
  type?: "review" | "price";
}

const HospitalCard: FC<IHospitalCardProps> = ({
  hospitalInfo,
  type = "review",
}) => {
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
          <ImageWrapper>
            <Image
              style={{
                borderRadius: "0.5rem",
              }}
              src={hospitalInfo.attachments[0]?.signed_path}
              layout="fill"
              objectFit="cover"
              alt="hospital-image"
            />
          </ImageWrapper>
        )}
      </div>
      {type === "review" ? (
        <Description
          hospitalInfo={hospitalInfo as IHospitalInfoResult}
          size="md"
        />
      ) : (
        <DescriptionPrice
          hospitalInfo={hospitalInfo as IGoodPriceHospitals}
          size="md"
        />
      )}
    </div>
  );
};

export default HospitalCard;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 9rem;
`;
