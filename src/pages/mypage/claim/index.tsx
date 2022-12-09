import { withAuthentication } from "@/pages/withAuthenticate";
import { NextPageContext } from "next";
import React from "react";

const Claim = () => {
  return <div></div>;
};

export default Claim;

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return { props: {} };
  }
);
