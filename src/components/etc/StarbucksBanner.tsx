import { useRouter } from "next/router";
import React from "react";
import BenefitBanner from "@/public/assets/benefit-banner.png";
import BenefitButton from "@/public/assets/benefit-button.png";
import Image from "next/image";

interface StarbucksBannerProps {
  showButton?: boolean;
  hospitalId?: string;
}

const StarbucksBanner = ({ showButton, hospitalId }: StarbucksBannerProps) => {
  const router = useRouter();
  console.log(hospitalId);
  return (
    <div
      css={{
        display: "flex",
        "& .benefit": {
          flex: "1",
        },
        cursor: "pointer",
      }}
      role="link"
      onClick={() => {
        router.push({
          pathname: `/event`,
          query: hospitalId ? { hospitalId } : undefined,
        });
      }}
    >
      <Image
        src={BenefitBanner}
        alt="benefit-banner"
        css={{ width: "100%", objectFit: "cover" }}
      />

      {showButton && (
        <Image src={BenefitButton} objectFit="contain" alt="benefit-banner" />
      )}
    </div>
  );
};

export default StarbucksBanner;
