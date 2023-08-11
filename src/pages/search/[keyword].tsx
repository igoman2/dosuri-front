import { ChangeEvent, FC, useEffect, useState } from "react";
import { IGetHospitalListParams, IHospitalInfoResult } from "@/types/service";

import ArrowRight from "@/public/assets/arrow-right-bold.png";
import Button from "@/components/Button";
import HospitalCard from "@/components/Card/HospitalCard";
import Image from "next/image";
import KeywordCommunity from "@/components/domain/Search/KeywordCommunity";
import KeywordHospitals from "@/components/domain/Search/KeywordHospitals";
import Layout from "@/components/Layout";
import { NextPageContext } from "next";
import { NextSeo } from "next-seo";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import SearchHeader from "@/components/Layout/Header/SearchHeader";
import Tab from "@/components/Tab";
import styled from "@emotion/styled";
import { useGetCommunity } from "@/hooks/service/useGetCommunity";
import { useHospital } from "@/hooks/service/useHospital";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { TabItem } from "@/types/community";
import { SearchTabList } from "@/constants/Tab";

interface ISearchResultProps {
  keyword: string;
}

const SearchResult: FC<ISearchResultProps> = ({ keyword }) => {
  const [inputText, setInputText] = useState(keyword);
  const [currentTab, setCurrentTab] = useState<TabItem>(SearchTabList[0]);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    const currentTab = SearchTabList.find(
      (tab) => tab.value === router.query.tab
    );
    setCurrentTab(currentTab ?? SearchTabList[0]);
  }, [router]);

  const params: IGetHospitalListParams = {
    search: router.query.keyword as string,
    page_size: 3,
  };
  const { hospitals: hospitalsInAllTab } = useHospital(
    params,
    currentTab.value
  );

  const { communityList } = useGetCommunity(params);

  const onTabClickHander = (tab: TabItem) => {
    setCurrentTab(tab);
    router.replace({
      pathname: `/search/${router.query.keyword}`,
      query: { keyword: router.query.keyword, tab: tab.value },
    });
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleToAllHospitals = () => {
    setCurrentTab({
      title: "병원",
      value: "hospital",
    });
    router.replace({
      pathname: `/search/${router.query.keyword}`,
      query: { keyword: router.query.keyword, tab: "hospital" },
    });
  };

  const handleToAllCommunity = () => {
    setCurrentTab({
      title: "도수톡",
      value: "talk",
    });
    router.replace({
      pathname: `/search/${router.query.keyword}`,
      query: { keyword: router.query.keyword, tab: "talk" },
    });
  };

  const HospitalResult = (
    <ResultWrapper>
      <div className="hospital-section">
        <div className="title">
          병원
          <span className="list-length"> {hospitalsInAllTab?.count}</span>건
        </div>

        {hospitalsInAllTab?.results.map((hospital: IHospitalInfoResult) => (
          <Link href={`/hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <div css={{ marginTop: "1rem" }}>
                <HospitalCard hospitalInfo={hospital} />
              </div>
            </a>
          </Link>
        ))}
      </div>
    </ResultWrapper>
  );

  const TalkResult = (
    <ResultWrapper>
      <div className="community-section">
        <div className="title">
          도수톡
          <span className="list-length"> {communityList.count}</span>건
        </div>
        {communityList.results.map((post) => (
          <Link href={`/community/${post.uuid}`} key={post.uuid}>
            <PostCard
              review={post}
              bottom={<PostBottom review={post} type="list" />}
            />
          </Link>
        ))}
      </div>
    </ResultWrapper>
  );
  const AllResult = (
    <ResultWrapper>
      <div>
        {HospitalResult}
        <MoreButtonWrapper>
          <Button
            onClick={handleToAllHospitals}
            text={
              <MoreButton>
                <div className="text">병원 검색결과 전체보기</div>
                <Image
                  src={ArrowRight}
                  width={14}
                  height={14}
                  alt="arrow-right"
                />
              </MoreButton>
            }
            color={theme.colors.black}
            fontSize="md"
            borderRadius="4rem"
            width="100%"
            backgroundColor={theme.colors.grey_light}
          />
        </MoreButtonWrapper>
      </div>

      <div>
        {TalkResult}
        <MoreButtonWrapper
          css={{
            marginBottom: "2rem",
          }}
        >
          <Button
            onClick={handleToAllCommunity}
            text={
              <MoreButton>
                <div className="text">도수톡 검색결과 전체보기</div>
                <Image
                  src={ArrowRight}
                  width={14}
                  height={14}
                  alt="arrow-right"
                />
              </MoreButton>
            }
            color={theme.colors.black}
            fontSize="md"
            borderRadius="4rem"
            width="100%"
            backgroundColor={theme.colors.grey_light}
          />
        </MoreButtonWrapper>
      </div>
    </ResultWrapper>
  );

  return (
    <Layout
      header={<SearchHeader onInput={onInput} inputText={inputText} />}
      footer={false}
    >
      <NextSeo title={`${inputText} 검색결과 | 도수리-도수치료 리얼후기`} />

      <>
        <Tab
          tabList={SearchTabList}
          currentTab={currentTab}
          onTabClickHander={onTabClickHander}
        />

        {currentTab.value === "all" && AllResult}
        {currentTab.value === "hospital" && <KeywordHospitals />}
        {currentTab.value === "talk" && <KeywordCommunity />}
      </>
    </Layout>
  );
};

export default SearchResult;

const ResultWrapper = styled.div`
  .hospital-section {
    margin-top: 2.5rem;
  }

  .community-section {
    margin-top: 2.5rem;
  }

  .title {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
  }

  .list-length {
    color: ${(props) => props.theme.colors.purple};
  }
`;

const MoreButtonWrapper = styled.div`
  margin-top: 1.5rem;
`;

const MoreButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context;
  const { keyword } = query;
  return {
    props: {
      keyword,
    },
  };
};
