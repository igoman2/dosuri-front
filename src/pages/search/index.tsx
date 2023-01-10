import "react-spring-bottom-sheet/dist/style.css";

import { Suspense, useCallback, useEffect } from "react";

import AllFilterSection from "@/components/pages/Search/AllFilterSection";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout";
import ManyReviewSection from "@/components/pages/Search/ManyReviewSection";
import NewReviewSection from "@/components/pages/Search/NewReviewSection";
import Spinner from "@/components/UI/Spinner";
import { scrollState } from "@/store/searchOption";
import { useRecoilState } from "recoil";

const Home = () => {
  const [scrollY, setScrollY] = useRecoilState(scrollState);

  const onScroll = useCallback((event: Event) => {
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (window) {
      window.scrollTo(0, scrollY);
    }
  }, [scrollY]);

  return (
    <Layout header={<Header left={true} center={true} />} footer={false}>
      <NewReviewSection />
      <ManyReviewSection />
      <Suspense fallback={<Spinner />}>
        <AllFilterSection />
      </Suspense>
    </Layout>
  );
};

export default Home;
