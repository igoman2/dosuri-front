import "react-spring-bottom-sheet/dist/style.css";

import AllFilterSection from "@/components/pages/Search/AllFilterSection";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout";
import ManyReviewSection from "@/components/pages/Search/ManyReviewSection";
import NewReviewSection from "@/components/pages/Search/NewReviewSection";
import Spinner from "@/components/UI/Spinner";
import { Suspense } from "react";

const Home = () => {
  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <NewReviewSection />
      <ManyReviewSection />
      <Suspense fallback={<Spinner />}>
        <AllFilterSection />
      </Suspense>
    </Layout>
  );
};

export default Home;
