import { css, useTheme } from "@emotion/react";
import * as Yup from "yup";

import Icon from "@/util/Icon";
import Kakao from "@/components/Oauth/Kakao";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { Field, FormikProvider, useFormik } from "formik";
import styled from "@emotion/styled";
import Button from "@/components/Button";
import api from "@/service/axiosConfig";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/service/useUser";
import { userInfoState } from "@/store/user";
import { setTokenInCookie } from "@/util/setToken";
import { useRecoilState } from "recoil";
import { useQuery } from "react-query";
import { queryKeys } from "@/service/react-query/constants";
import { getUser } from "@/service/apis/user";

const Login = () => {
  const theme = useTheme();
  const [tempLogin, setTempLogin] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string(),
      password: Yup.string(),
    }),
    onSubmit: () => {
      handleTempLogin();
    },
  });

  const mainLayout = css`
    position: relative;
    flex: 1 1 0%;
    overflow-y: auto;
    padding: 0 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `;

  const logoTitle = css`
    font-weight: 700;
    font-size: ${theme.fontSizes.xxxl};
    line-height: ${theme.lineHeights.xxxl};
    min-width: 32rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
  `;

  const buttonSection = css`
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
  `;

  const temp = css`
    margin-top: 3rem;
    font-size: ${theme.fontSizes.lg};
    line-height: ${theme.lineHeights.lg};
  `;

  const temp2 = css`
    margin-top: 6rem;
    font-size: ${theme.fontSizes.lg};
    line-height: ${theme.lineHeights.lg};
    color: ${theme.colors.purple};
    cursor: pointer;
  `;

  const router = useRouter();
  const [_, setUserInfo] = useRecoilState(userInfoState);

  const handleTempLogin = async () => {
    console.log(formik.values.email);
    const resp = await api.post("/user/v1/auth", {
      username: formik.values.email,
      password: formik.values.password,
      type: "password",
    });

    const {
      data: {
        user_uuid: uuid,
        access_token: accessToken,
        refresh_token: refreshToken,
        is_new: isNew,
      },
    } = resp as any;

    const resp2 = await getUser(accessToken);
    const user = resp2!;
    setUserInfo({ ...user, uuid, refreshToken, accessToken });

    setTokenInCookie("refresh", refreshToken);
    setTokenInCookie("access", accessToken);
    router.push("/");
  };
  console.log("@@@@!#!@#");
  return (
    <main css={mainLayout}>
      <NextSeo title="로그인 | 도수리-도수치료 리얼후기" />

      {/* <AppleLogin /> */}
      <Icon name="logo2" width="110" height="140" />
      <p css={logoTitle}>
        <span>도수 통증치료 병원정보는</span>
        <span>도수리</span>
      </p>
      {tempLogin ? (
        <FormikProvider value={formik}>
          <form onSubmit={formik.handleSubmit}>
            <TempLoginWrapper>
              <div className="el">
                <span>ID</span>
                <Field id="email" name="email" placeholder="ID 입력" />
              </div>
              <div className="el">
                <span>PW</span>
                <Field id="password" name="password" placeholder="PW 입력" />
              </div>
              <Button text="로그인" type="submit"></Button>
            </TempLoginWrapper>
          </form>
        </FormikProvider>
      ) : (
        <>
          <p css={temp}>로그인이 필요합니다.</p>

          <div css={buttonSection}>
            <Kakao />

            <div
              id="appleid-signin"
              data-mode="center-align"
              data-type="sign-in"
              data-color="black"
              data-border="false"
              data-border-radius="5"
              data-height="50"
            ></div>

            {/* <Google /> */}
          </div>
          <p
            css={temp2}
            onClick={() => {
              setTempLogin(true);
            }}
          >
            테스트 계정으로 로그인
          </p>
        </>
      )}
    </main>
  );
};

export default Login;

const TempLoginWrapper = styled.div`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;

  .el {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  span {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }

  input {
    height: 4.2rem;
    width: 22rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    padding: 1rem;
    outline-color: ${(props) => props.theme.colors.purple};

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }
  }
`;
