import "react-spring-bottom-sheet/dist/style.css";

import { Suspense, useCallback, useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

import AllFilterSection from "@/components/pages/Search/AllFilterSection";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout";
import ManyReviewSection from "@/components/pages/Search/ManyReviewSection";
import NewReviewSection from "@/components/pages/Search/NewReviewSection";
import Spinner from "@/components/UI/Spinner";
import { locationState } from "@/store/location";
import useGeolocation from "@/hooks/useGeolocation";
import useScrollRestoration from "@/hooks/useScrollRestoration";

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
      <NewReviewSection />
      <ManyReviewSection />
      <Suspense fallback={<Spinner />}>
        <AllFilterSection />
      </Suspense>
    </Layout>
  );
};

export default Home;
