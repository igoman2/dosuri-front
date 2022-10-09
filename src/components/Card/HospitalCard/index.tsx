import { useTheme } from "@emotion/react";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import Icon from "@/util/Icon";

export interface HospitalInfo {
  title: string;
  location: string;
  reviewConut: number;
  thunbCount: number;
  recentReview: string | null;
  hospitalImage: StaticImageData; // 서버에서 받아오는거로 변경할 예정
}

interface ICardProps {
  hospitalInfo: HospitalInfo;
}

const Card: FC<ICardProps> = ({ hospitalInfo }) => {
  const theme = useTheme();

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
            fontSize: theme.fontSizes.md,
            lineHeight: theme.lineHeights.md,
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
            fontSize: theme.fontSizes.md,
            lineHeight: theme.lineHeights.md,
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
                fontSize: theme.fontSizes.md,
                lineHeight: theme.lineHeights.md,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <Icon
                name="talk_square"
                width="16"
                height="15"
                fill={theme.colors.purple}
              />

              {hospitalInfo.recentReview}
            </span>
          ) : (
            <span
              css={{
                color: theme.colors.grey,
                fontSize: theme.fontSizes.md,
                lineHeight: theme.lineHeights.md,
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
    </div>
  );
};

export default Card;