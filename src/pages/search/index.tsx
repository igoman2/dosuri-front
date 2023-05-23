import "react-spring-bottom-sheet/dist/style.css";
import Icon from "@/util/Icon";
import { Suspense, useEffect } from "react";
import Link from "next/link";
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
import SelectAddressBar from "@/components/domain/Address/SelectAddressBar";
import useAuth from "@/hooks/useAuth";
import SelectAddressModal from "@/components/domain/Address/SelectAddressModal";

const Home = () => {
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);
  const { isLoggedIn } = useAuth();
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
          center={isLoggedIn ? <SelectAddressBar /> : <></>}
          right={
            <Link href="/search/input">
              <Icon name="search" />
            </Link>
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

      {/* <NewReviewSection />
      <ManyReviewSection /> */}
      <Suspense fallback={<Spinner />}>
        <AllFilterSection />
      </Suspense>
      <SelectAddressModal />
    </Layout>
  );
};

export default Home;
