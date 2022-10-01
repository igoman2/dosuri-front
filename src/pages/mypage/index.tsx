import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import React from "react";

const Mypage = () => {
  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <div>mypage</div>
    </Layout>
  );
};

export default Mypage;
