import Button from "@/components/Button";
import CustomImage from "@/components/CustomImage";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Tab from "@/components/Tab";
import ImageTextView from "@/components/UI/ImageTextView";
import Icon from "@/util/Icon";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

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

const HospitalInformation = () => {
  const isRecommended = false;

  const theme = useTheme();
  const keywords: string[] = [
    "카이로프랙틱",
    "척추",
    "운동병행",
    "치료복 구비",
    "재활",
    "운동프로그램",
  ];

  const [currentTab, setCurrentTab] = useState<TabItem>(TabList[0]);
  const router = useRouter();

  useEffect(() => {
    router.replace({
      pathname: `/hospital/${router.query.id}`,
      query: { tab: currentTab.value },
    });
  }, []);

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
      <HospitalInformationWrapper>
        <CustomImage
          src={
            "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/hospitalThumbnail.png"
          }
        />
        <Content>
          <div className="head">
            <div className="hospital-name">압구정강남바른정형외과의원</div>
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

          <div className="list">
            <div className="list-title">병원 소개</div>
            <div>압구정역 4번 출구 강남 바른정형외과 입니다.</div>
          </div>
          <div className="list">
            <div className="list-title">치료 키워드</div>
            <ButtonWrapper>
              {keywords.map((keyword, i) => (
                <Button
                  key={i}
                  text={keyword}
                  backgroundColor={theme.colors.white}
                  color={theme.colors.black}
                  border={`0.1rem solid ${theme.colors.grey}`}
                />
              ))}
            </ButtonWrapper>
          </div>
          <div className="list">
            <div className="list-title">진료 시간</div>
            <div>압구정역 4번 출구 강남 바른정형외과 입니다.</div>
          </div>
          <div className="list">
            <div className="list-title">주소</div>
            <div>서울특별시 강남구 도산대로1길 4</div>
          </div>
          <div className="list">
            <div className="list-title">전화번호</div>
            <div className="phone-number">02-585-2231</div>
          </div>
        </Content>
      </HospitalInformationWrapper>
    </Layout>
  );
};

export default HospitalInformation;

const HospitalInformationWrapper = styled.div``;

const Content = styled.div`
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

  .list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2.5rem;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};

    &-title {
      color: ${(props) => props.theme.colors.purple};
      font-weight: 700;
    }
  }

  .phone-number {
    color: ${(props) => props.theme.colors.purple_light};
    text-decoration: underline;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;
