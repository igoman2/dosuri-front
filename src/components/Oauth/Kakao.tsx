// const CLIENT_ID = "784d5eb4b69acdedc342cab868befa1a";
// const SECRET_KEY = "73vv3gklUt4eCGG96GNgV7GdrIJr1xGE";
// const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";

// export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
import Image from "next/image";
import React from "react";
import Button from "../Button";
import kakaoIcon from "@/public/assets/kakao.png";
import { useTheme } from "@emotion/react";

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
    />
  );
};

export default Kakao;
