export const GoogleAPIKey = "AIzaSyC5eAnY-kRNvyb4vYFiOX2C2otiSfqa2AQ";

export const ClientID =
  "312645105412-u34cvp9msb1avnh4s6j963lthlsgph24.apps.googleusercontent.com";

export const ClientPassword = "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";

import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  useGoogleLogin,
} from "react-google-login";

import Button from "../Button";
import Image from "next/image";
import React from "react";
import googleIcon from "@/public/assets/google.png";
import { useTheme } from "@emotion/react";

const Google = () => {
  const theme = useTheme();

  const onSuccess = async (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    // const {
    //   googleId,
    //   profileObj: { email, name },
    // } = response;
    // await onGoogleLogin();
    // 구글 로그인 성공시 서버에 전달할 데이터
  };

  const onFailure = (error: any) => {};

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
      />
      {/* <GoogleLogin
        cookiePolicy={"single_host_origin"}
        clientId={ClientID}
        render={(renderProps) => (
          <Button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
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
                <Image
                  src={googleIcon}
                  alt="google-logo"
                  width={20}
                  height={20}
                />
                <div className="text"> 구글 계정으로 시작하기</div>
              </div>
            }
            color={theme.colors.black}
            backgroundColor={theme.colors.white}
            border={`0.1rem solid ${theme.colors.grey}`}
          />
        )}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      /> */}
    </>
  );
};

export default Google;
