import Button from "../Button";
import Image from "next/image";
import googleIcon from "@/public/assets/google.png";
import { useTheme } from "@emotion/react";
import Link from "next/link";

const Google = () => {
  const theme = useTheme();

  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?client_id=" +
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID +
    "&redirect_uri=" +
    process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL +
    "&response_type=code" +
    "&scope=openid email profile";

  return (
    <Link href={googleAuthUrl}>
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
            <div className="text">구글 계정으로 시작하기</div>
          </div>
        }
        color={theme.colors.black}
        backgroundColor={theme.colors.white}
        border={`0.1rem solid ${theme.colors.grey}`}
      />
    </Link>
  );
};

export default Google;
