import { useTheme } from "@emotion/react";
import Image, { StaticImageData } from "next/image";
import React, { FC } from "react";
import bubble from "@/public/assets/speechbubble_square.png";
import BubbleIcon from "@/public/assets/speechbubble_sqaure.svg";

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
          }}
        >
          <div>{hospitalInfo.location}</div>
          <div>{`후기 ${hospitalInfo.reviewConut}개`}</div>
          <div>{`추천 ${hospitalInfo.thunbCount}명`}</div>
        </div>
        <div
          css={{
            fontSize: theme.fontSizes.md,
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image src={bubble} width={16} height={15} alt="bubble" />
          {hospitalInfo.recentReview ? (
            <span
              css={{
                color: theme.colors.purple,
              }}
            >
              {hospitalInfo.recentReview}
            </span>
          ) : (
            <span
              css={{
                color: theme.colors.grey,
              }}
            >
              <BubbleIcon width="20" height="40" fill="#506978" /> 등록된 후기가
              없어요
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
