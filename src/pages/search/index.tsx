import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import React from "react";

const Search = () => {
  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <div>search</div>
    </Layout>
  );
};

export default Search;
