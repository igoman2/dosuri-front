import { useTheme } from "@emotion/react";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import googleIcon from "@/public/assets/google.png";

import { signIn } from "next-auth/react";

const Google = () => {
  const theme = useTheme();

  return (
    <>
      <Button
        text={
          <div
            css={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
              fontSize: theme.fontSizes.lg,
              lineHeight: theme.lineHeights.lg,
              fontWeight: 700,
              "& .text": {
                fontSize: theme.fontSizes.lg,
                lineHeight: theme.lineHeights.lg,
                fontWeight: 700,
                paddingTop: "0.2rem",
              },
            }}
          >
            <Image src={googleIcon} alt="google-logo" width={20} height={20} />
            <div className="text"> 구글 계정으로 시작하기</div>
          </div>
        }
        color={theme.colors.black}
        backgroundColor={theme.colors.white}
        border={`0.1rem solid ${theme.colors.grey}`}
        onClick={() => signIn("google")}
      />
    </>
  );
};

export default Google;
