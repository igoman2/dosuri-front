import React, { FC, Suspense, useEffect, useState } from "react";
import {
  getHospitalInfo,
  getHospitalTreatments,
  toggleHospitalThumbup,
} from "@/service/apis/hospital";
import { useMutation, useQuery } from "react-query";

import Button from "@/components/Button";
import DoSwiper from "@/components/DoSwiper";
import Doctors from "@/components/pages/Hospital/Doctors";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Icon from "@/util/Icon";
import ImageTextView from "@/components/UI/ImageTextView";
import Information from "@/components/pages/Hospital/Information";
import Layout from "@/components/Layout";
import Link from "next/link";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import Price from "@/components/pages/Hospital/Price";
import Reviews from "@/components/pages/Hospital/Reviews";
import Spinner from "@/components/UI/Spinner";
import Tab from "@/components/Tab";
import { queryClient } from "@/service/react-query/queryClient";
import { queryKeys } from "@/service/react-query/constants";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import { useRouter } from "next/router";

interface TabItem {
  title: string;
  value: string;
}

const TabList: TabItem[] = [
  {
    title: "치료후기",
    value: "reviews",
  },
  {
    title: "가격정보",
    value: "price",
  },
  {
    title: "병원정보",
    value: "information",
  },
  {
    title: "의료진",
    value: "doctors",
  },
];

interface IHospitalInformationProps {
  id: string;
  tab: string;
}

const HospitalInformation: FC<IHospitalInformationProps> = ({ id, tab }) => {
  const [currentTab, setCurrentTab] = useState<TabItem>(
    TabList.find((t) => t.value === tab) ?? TabList[0]
  );
  const [isUp, setIsUp] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: `/hospital/${id}`,
      query: { tab: currentTab.value },
    });
  }, [currentTab]);

  const onTabClickHander = (tab: TabItem) => {
    setCurrentTab(tab);
    router.replace({
      pathname: `/hospital/${router.query.id}`,
      query: { tab: tab.value },
    });
  };

  // 단순 정보 조회라서 useQuery를 사용하였지만 서버 내부적으로는 해당 병원에 대한 조회수를 올리는 POST api로 개발되어있기 때문에 POST 요청이 캐시되는 것을 방지하기 위해 cacheTime을 0으로 설정
  const { data: hospitalInfoData } = useQuery({
    queryKey: ["getHospitalInfo"],
    queryFn: async () => {
      const data = await getHospitalInfo(id);
      return data;
    },
    cacheTime: 0,
    retry: 0,
  });

  const uuid = hospitalInfoData?.uuid;

  const { data: hospitalTreatmentsData } = useQuery({
    queryKey: ["hospital-treatments", uuid],
    queryFn: async () => {
      const resp = await getHospitalTreatments(uuid!);
      return resp;
    },

    enabled: !!uuid,
  });

  useEffect(() => {
    if (hospitalInfoData) {
      setIsUp(hospitalInfoData.is_up);
    }
  }, [hospitalInfoData]);

  const mutate = useMutation({
    mutationFn: () => {
      return toggleHospitalThumbup({
        hospital: uuid,
        is_up: !isUp,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.hospital],
        refetchInactive: true,
      });
    },
  });

  if (!hospitalInfoData || !hospitalTreatmentsData) {
    return <div>bug</div>;
  }

  const onThumbUp = () => {
    mutate.mutate();
    setIsUp((prev) => !prev);
  };

  const imageSource = hospitalInfoData.attachments.map(
    (image) => image.signed_path
  );

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <NextSeo
        title={`${hospitalInfoData.name} 상세정보 | 도수리-도수치료 리얼후기`}
      />

      <Hospital>
        <div className="swiper-layout">
          {imageSource.length === 0 ? (
            <div
              css={{
                width: "100%",
                height: "21.2rem",
                backgroundColor: theme.colors.grey,
              }}
            ></div>
          ) : (
            <SwiperWrapper>
              <DoSwiper source={imageSource} slidesPerView={1} />
            </SwiperWrapper>
          )}
        </div>

        <div className="hospital-content">
          <div className="head">
            <div className="hospital-name">{hospitalInfoData.name}</div>
            <div onClick={onThumbUp}>
              <ImageTextView
                text={"추천"}
                color={isUp ? theme.colors.green : theme.colors.grey}
                image={
                  <Icon
                    name="thumb"
                    fill={isUp ? theme.colors.green : theme.colors.grey}
                  />
                }
                reverse
              />
            </div>
          </div>
          <div className="tab-wrapper">
            <Tab
              tabList={TabList}
              currentTab={currentTab}
              onTabClickHander={onTabClickHander}
            />
          </div>
          <Suspense fallback={<Spinner />}>
            {currentTab.value === "information" && (
              <Information hospitalData={hospitalInfoData} />
            )}
            {currentTab.value === "doctors" && (
              <Doctors hospitalData={hospitalInfoData} />
            )}
            {currentTab.value === "reviews" && (
              <Reviews hospitalData={hospitalInfoData} />
            )}
            {currentTab.value === "price" && (
              <Price
                hospitalData={hospitalInfoData}
                hospitalTreatmentsData={hospitalTreatmentsData}
              />
            )}
          </Suspense>
        </div>
        <SaleButtonWrapper>
          <Link href="/insurance-register">
            <a>
              <Button
                text="도수리에서 최대 70% 싸게 도수치료 받기"
                width="100%"
                height="5.2rem"
                borderRadius="0.3rem"
                backgroundColor={theme.colors.purple_light}
                bold
              />
            </a>
          </Link>
        </SaleButtonWrapper>
      </Hospital>
    </Layout>
  );
};

export default HospitalInformation;

const Hospital = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: -6rem;
  margin: auto;

  .hospital-content {
    padding: 0 2rem;
    margin-bottom: 8.7rem;
    overflow-x: hidden;
  }

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2.5rem;

    & .hospital-name {
      font-size: ${(props) => props.theme.fontSizes.xl};
      line-height: ${(props) => props.theme.lineHeights.xl};
      font-weight: 700;
    }
  }

  .tab-wrapper {
    margin-bottom: 2.5rem;
  }
`;

const SaleButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 2rem;
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 1rem 0;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 100;
`;

const SwiperWrapper = styled.div`
  div {
    position: relative;
    width: 100%;
    height: 21.2rem;
    background-color: white;
  }
`;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { id, tab } = query;
  return {
    props: {
      id,
      tab: tab ?? "reviews",
    },
  };
};
