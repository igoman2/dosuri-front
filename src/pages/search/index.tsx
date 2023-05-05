import "react-spring-bottom-sheet/dist/style.css";

import { Suspense, useEffect } from "react";

import AllFilterSection from "@/components/domain/Search/AllFilterSection";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout";
import ManyReviewSection from "@/components/domain/Search/ManyReviewSection";
import NewReviewSection from "@/components/domain/Search/NewReviewSection";
import { NextSeo } from "next-seo";
import Spinner from "@/components/Spinner/Spinner";
import { locationState } from "@/store/location";
import useGeolocation from "@/hooks/useGeolocation";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import { useSetRecoilState } from "recoil";
import SearchBar from "@/components/domain/Search/SearchBar";

const Home = () => {
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);
  useScrollRestoration();

  useEffect(() => {
    if (location.loaded) {
      setLocaton({
        lat: location.coordinates?.latitude ?? 0,
        lng: location.coordinates?.longitude ?? 0,
      });
    }
  }, [location]);

  return (
    <Layout
      header={
        <Header
          left={true}
          center={
            <SearchBar
              inputText=""
              placeHolder="병원, 지역, 후기 키워드 검색하기"
            />
          }
        />
      }
    >
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
