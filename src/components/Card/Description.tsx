import Icon from "@/util/Icon";
import { useTheme } from "@emotion/react";
import React, { FC } from "react";
import { HospitalInfo } from "./HospitalCard";

export interface IDescriptionProps {
  hospitalInfo: HospitalInfo;
  size: "xxxl" | "xxl" | "xl" | "lg" | "md" | "sm" | "xs";
}

const Description: FC<IDescriptionProps> = ({ hospitalInfo, size }) => {
  const theme = useTheme();

  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "0.5rem",
        marginLeft: "1rem",
      }}
    >
      <div
        css={{
          fontSize: theme.fontSizes[size],
          lineHeight: theme.lineHeights[size],
          fontWeight: 700,
        }}
      >
        {hospitalInfo.title}
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
        <div>{hospitalInfo.location}</div>
        <div>{`후기 ${hospitalInfo.reviewConut}개`}</div>
        <div>{`추천 ${hospitalInfo.thunbCount}명`}</div>
      </div>
      <div>
        {hospitalInfo.recentReview ? (
          <span
            css={{
              color: theme.colors.purple,
              fontSize: theme.fontSizes[size],
              lineHeight: theme.lineHeights[size],
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {hospitalInfo.recentReview}
          </span>
        ) : (
          <span
            css={{
              color: theme.colors.grey,
              fontSize: theme.fontSizes[size],
              lineHeight: theme.lineHeights[size],
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Icon
              name="talk_square"
              width="16"
              height="15"
              fill={theme.colors.grey}
            />
            등록된 후기가 없어요
          </span>
        )}
      </div>
    </div>
  );
};

export default Description;
