import BenefitBanner from "@/public/assets/benefit-banner.png";
import Image from "next/image";
import { ReactNode } from "react";

interface StarbucksBannerProps {
  onClick?: () => void;
  bannerButton?: ReactNode;
}

const StarbucksBanner = ({ onClick, bannerButton }: StarbucksBannerProps) => {
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
      onClick={onClick}
    >
      <Image
        src={BenefitBanner}
        alt="benefit-banner"
        css={{ width: "100%", objectFit: "cover" }}
      />

      {bannerButton}
    </div>
  );
};

export default StarbucksBanner;
