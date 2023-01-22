import React, { FC } from "react";

import { IGoodPriceHospitals } from "@/service/types";
import { useTheme } from "@emotion/react";

export interface IDescriptionPriceProps {
  hospitalInfo: IGoodPriceHospitals;
  size: "xxxl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
}

const DescriptionPrice: FC<IDescriptionPriceProps> = ({
  hospitalInfo,
  size,
}) => {
  const theme = useTheme();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.5rem",
        marginLeft: "1rem",
        minWidth: 0,
      }}
    >
      <div
        css={{
          fontSize: theme.fontSizes[size],
          lineHeight: theme.lineHeights[size],
          fontWeight: 700,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {hospitalInfo.name}
      </div>
      <div
        css={{
          display: "flex",
          color: theme.colors.grey,
          gap: 10,
          fontSize: theme.fontSizes[size],
          lineHeight: theme.lineHeights[size],
        }}
      >
        <div>{hospitalInfo.area}</div>
        <div>{`후기 ${hospitalInfo.article_count}개`}</div>
        <div>{`추천 ${hospitalInfo.up_count}명`}</div>
      </div>
      <div>
        <span
          css={{
            fontSize: theme.fontSizes[size],
            lineHeight: theme.lineHeights[size],
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span>60분</span>
          <span css={{ color: theme.colors.purple, fontWeight: 700 }}>
            {hospitalInfo.avg_price_per_hour.toLocaleString()}원
          </span>
        </span>
      </div>
    </div>
  );
};

export default DescriptionPrice;
