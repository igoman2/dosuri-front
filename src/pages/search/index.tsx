import "react-spring-bottom-sheet/dist/style.css";

import { Suspense, useEffect } from "react";

import AllFilterSection from "@/components/pages/Search/AllFilterSection";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout";
import ManyReviewSection from "@/components/pages/Search/ManyReviewSection";
import NewReviewSection from "@/components/pages/Search/NewReviewSection";
import { NextSeo } from "next-seo";
import Spinner from "@/components/Spinner/Spinner";
import { locationState } from "@/store/location";
import useGeolocation from "@/hooks/useGeolocation";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import { useSetRecoilState } from "recoil";

const Home = () => {
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);
  useScrollRestoration();

  useEffect(() => {
    if (location.loaded) {
      setLocaton({
        lat: location.coordinates?.lat ?? 0,
        lng: location.coordinates?.lng ?? 0,
      });
    }
  }, [location]);

  return (
    <Layout header={<Header left={true} center={true} />}>
      <NextSeo
        title="병원찾기 | 도수리-도수치료 리얼후기"
        canonical="https://www.dosuri.site/search"
        openGraph={{
          url: "https://www.dosuri.site/search",
        }}
      />

      <NewReviewSection />
      <ManyReviewSection />
      <Suspense fallback={<Spinner />}>
        <AllFilterSection />
      </Suspense>
    </Layout>
  );
};

export default Home;
