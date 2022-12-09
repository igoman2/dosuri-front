import { withAuthentication } from "@/pages/withAuthenticate";
import { NextPageContext } from "next";
import React from "react";

const Inquiry = () => {
  return <div></div>;
};

export default Inquiry;

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return { props: {} };
  }
);
