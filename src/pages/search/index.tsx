import Icon from "@/util/Icon";
import { Suspense, useEffect } from "react";
import Link from "next/link";
import AllFilterSection from "@/components/domain/Search/AllFilterSection";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout";
import { NextSeo } from "next-seo";
import Spinner from "@/components/Spinner/Spinner";
import { locationState } from "@/store/location";
import useGeolocation from "@/hooks/useGeolocation";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import { useSetRecoilState } from "recoil";
import SelectAddressBar from "@/components/domain/Address/SelectAddressBar";
import useAuth from "@/hooks/useAuth";
import SelectAddressModal from "@/components/domain/Address/SelectAddressModal";
import Float from "@/components/domain/Community/Float";
import Button from "@/components/Button";
import useDirection from "@/hooks/useDirection";
import { useRouter } from "next/router";

const Home = () => {
  const location = useGeolocation();
  const setLocaton = useSetRecoilState(locationState);
  const { isLoggedIn } = useAuth();
  const [scrollDir] = useDirection();
  const router = useRouter();

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

      <Suspense fallback={<Spinner />}>
        <AllFilterSection />
      </Suspense>
      <SelectAddressModal />
      <Float
        scrollDir={scrollDir}
        distance="8.5rem"
        icon={
          <Button
            shadow
            bold
            iconName="map"
            text="지도로 보기"
            onClick={() => {
              router.push("/map");
            }}
          />
        }
      />
    </Layout>
  );
};

export default Home;
