import Button from "@/components/Button";
import CustomImage from "@/components/CustomImage";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Doctors from "@/components/pages/Hospital/Doctors";
import Information from "@/components/pages/Hospital/Information";
import Price from "@/components/pages/Hospital/Price";
import Reviews from "@/components/pages/Hospital/Reviews";
import Tab from "@/components/Tab";
import ImageTextView from "@/components/UI/ImageTextView";
import { getHospitalInfo } from "@/service/apis";
import theme from "@/styles/theme";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import { NextPageContext } from "next";
import { AppContext } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";

interface TabItem {
  title: string;
  value: string;
}

const TabList: TabItem[] = [
  {
    title: "병원정보",
    value: "information",
  },
  {
    title: "의료진",
    value: "doctors",
  },
  {
    title: "치료후기",
    value: "reviews",
  },
  {
    title: "가격정보",
    value: "price",
  },
];

interface IHospitalInformationProps {
  id: number;
  tab: string;
}

const HospitalInformation: FC<IHospitalInformationProps> = ({ id, tab }) => {
  const [currentTab, setCurrentTab] = useState<TabItem>(
    TabList.find((t) => t.value === tab) ?? TabList[0]
  );
  const router = useRouter();
  const isRecommended = false;

  const { isLoading: getHispitalListIsLoading, data: hospitalData } = useQuery({
    queryKey: ["getHospitalInfo"],
    queryFn: async () => {
      const data = await getHospitalInfo(id);
      return data;
    },
    staleTime: 3000,
    retry: 0,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err: any) => {},
  });

  useEffect(() => {
    router.replace({
      pathname: `/hospital/${id}`,
      query: { tab: currentTab.value },
    });
  }, [currentTab]);

  const onTabClickHander = (tab: TabItem) => {
    setCurrentTab(tab);
    console.log(router);
    router.replace({
      pathname: `/hospital/${router.query.id}`,
      query: { tab: tab.value },
    });
  };

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <Hospital>
        <CustomImage
          src={
            "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/hospitalThumbnail.png"
          }
        />
        <div className="hospital-content">
          <div className="head">
            <div className="hospital-name">{hospitalData?.name}</div>
            <ImageTextView
              text={"추천"}
              color={isRecommended ? theme.colors.green : theme.colors.grey}
              image={
                <Icon
                  name="thumb"
                  fill={isRecommended ? theme.colors.green : theme.colors.grey}
                />
              }
              reverse
            />
          </div>
          <div className="tab-wrapper">
            <Tab
              tabList={TabList}
              currentTab={currentTab}
              onTabClickHander={onTabClickHander}
            />
          </div>
          {currentTab.value === "information" && (
            <Information hospitalData={hospitalData} />
          )}
          {currentTab.value === "doctors" && (
            <Doctors hospitalData={hospitalData} />
          )}
          {currentTab.value === "reviews" && (
            <Reviews hospitalData={hospitalData} />
          )}
          {currentTab.value === "price" && (
            <Price hospitalData={hospitalData} />
          )}

          <SaleButtonWrapper>
            <Link href="/insurance-register">
              <a>
                <Button
                  text="도수리에서 최대 70% 싸게 도수치료 받기"
                  width="100%"
                  borderRadius="0.3rem"
                  backgroundColor={theme.colors.purple_light}
                />
              </a>
            </Link>
          </SaleButtonWrapper>
        </div>
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
  margin-top: 2rem;
  padding: 1rem 0;
`;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { id, tab } = query;
  return {
    props: {
      id,
      tab: tab ?? "information",
    },
  };
};
