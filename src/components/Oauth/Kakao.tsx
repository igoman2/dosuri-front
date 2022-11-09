import Image from "next/image";
import React from "react";
import Button from "../Button";
import kakaoIcon from "@/public/assets/kakao.png";
import { useTheme } from "@emotion/react";
import Link from "next/link";

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}&response_type=code`;

const Kakao = () => {
  const theme = useTheme();

  return (
    <Link href={KAKAO_AUTH_URL}>
      <a>
        <Button
          width="100%"
          text={
            <div
              css={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                "& .text": {
                  fontSize: theme.fontSizes.lg,
                  lineHeight: theme.lineHeights.lg,
                  fontWeight: 700,
                  paddingTop: "0.2rem",
                },
              }}
            >
              <Image src={kakaoIcon} alt="kakao-logo" width={30} height={30} />
              <div className="text">카카오 계정으로 시작하기</div>
            </div>
          }
          color={theme.colors.black}
          backgroundColor="#FAE100"
        />
      </a>
    </Link>
  );
};

export default Kakao;
