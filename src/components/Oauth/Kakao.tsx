import Image from "next/image";
import React from "react";
import Button from "../Button";
import kakaoIcon from "@/public/assets/kakao.png";
import { useTheme } from "@emotion/react";
import { signIn } from "next-auth/react";

const Kakao = () => {
  const theme = useTheme();

  return (
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
      onClick={() => signIn("kakao")}
    />
  );
};

export default Kakao;
