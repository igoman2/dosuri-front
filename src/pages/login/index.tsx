import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import React from "react";

const Login = () => {
  return (
    <Layout
      header={<Header left={true} center={true} right={true} />}
      footer={<Footer />}
    >
      <div>로그인 화면입니다.</div>
      <Button text="로그인" />
    </Layout>
  );
};

export default Login;
