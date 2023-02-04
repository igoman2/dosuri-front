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
import { scrollState } from "@/store/searchOption";
import { useBoolean } from "usehooks-ts";
import useGeolocation from "@/hooks/useGeolocation";

const Home = () => {
  const [scrollY, setScrollY] = useRecoilState(scrollState);
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);
  const { value: isIphone, setTrue, setFalse } = useBoolean();
  useEffect(() => {
    if (location.loaded) {
      setLocaton({
        lat: location.coordinates?.lat ?? 0,
        lng: location.coordinates?.lng ?? 0,
      });
    }
  }, [location]);

  const onScroll = useCallback((event: Event) => {
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    const agent = navigator.userAgent.toLowerCase();

    if (agent.indexOf("android") > -1) {
      setFalse();
    } else if (
      agent.indexOf("iphone") > -1 ||
      agent.indexOf("ipad") > -1 ||
      agent.indexOf("ipod") > -1
    ) {
      setTrue();
    } else {
      setFalse();
    }
  }, []);

  console.log(isIphone);

  useEffect(() => {
    if (isIphone) {
      return;
    }

    if (window) {
      window.scrollTo(0, scrollY);

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [scrollY, isIphone]);

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
