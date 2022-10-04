import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import styled from "@emotion/styled";
import React from "react";
import RegisterForm from "@/components/Register";

const Register = () => {
  return (
    <Layout header={<Header left={true} />} footer={false}>
      <RegisterWrapper>
        <div className="top">
          <div className="title">어서오세요! 도수리에는 처음이시네요.</div>
          <div className="subtitle">가입을 위해 추가정보를 입력해주세요</div>
        </div>
      </RegisterWrapper>
      <RegisterForm />
    </Layout>
  );
};

export default Register;

const RegisterWrapper = styled.div`
  .top {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & .title {
      font-size: ${(props) => props.theme.fontSizes.xxl};
      line-height: ${(props) => props.theme.lineHeights.xxl};
      color: ${(props) => props.theme.colors.purple};
    }

    & .subtitle {
      font-size: ${(props) => props.theme.fontSizes.lg};
      line-height: ${(props) => props.theme.lineHeights.lg};
      font-weight: 700;
    }
  }
`;
