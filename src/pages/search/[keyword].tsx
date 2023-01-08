import { ChangeEvent, FC, useState } from "react";
import {
  IGetHospitalListParams,
  IHospitalInfoResult,
  IHospitalReviewsResult,
} from "@/service/types";
import { TabItem, TabList } from "@/mock/tabList";

import ArrowRight from "@/public/assets/arrow-right-bold.png";
import Button from "@/components/Button";
import HospitalCard from "@/components/Card/HospitalCard";
import Icon from "@/util/Icon";
import Image from "next/image";
import KeywordCommunity from "@/components/pages/Search/KeywordCommunity";
import KeywordHospitals from "@/components/pages/Search/KeywordHospitals";
import Layout from "@/components/Layout";
import Link from "next/link";
import { NextPageContext } from "next";
import PostCard from "@/components/Card/PostCard";
import SearchHeader from "@/components/Layout/Header/SearchHeader";
import Tab from "@/components/Tab";
import styled from "@emotion/styled";
import { useGetCommunity } from "@/hooks/service/useGetCommunityList";
import { useHospital } from "@/hooks/service/useHospital";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

interface ISearchResultProps {
  keyword: string;
}

const SearchResult: FC<ISearchResultProps> = ({ keyword }) => {
  const [inputText, setInputText] = useState(keyword);
  const [currentTab, setCurrentTab] = useState<TabItem>(TabList[0]);
  const router = useRouter();
  const theme = useTheme();

  const params: IGetHospitalListParams = {
    search: router.query.keyword as string,
    page_size: 3,
  };
  const { hospitals: hospitalsInAllTab } = useHospital(
    params,
    currentTab.value
  );

  const { communityList } = useGetCommunity(params);

  const postClickHandler = (id: string) => {
    router.push({
      pathname: `/community/${id}`,
    });
  };

  const hospitalClickHandler = (id: string) => {
    router.push({
      pathname: `/hospital/${id}`,
    });
  };

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
          <div
            className="link"
            onClick={() => hospitalClickHandler(hospital.uuid)}
            key={hospital.uuid}
          >
            <HospitalCard hospitalInfo={hospital} />
          </div>
        ))}
      </div>
    </ResultWrapper>
  );

  const renderPostBottom = (review: IHospitalReviewsResult) => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="20" height="20" />
            <span>{review.up_count}</span>
          </div>

          <div className="comment">
            <Icon name="comment" width="20" height="20" />
            <span>{review.article_attachment_assoc.length}</span>
          </div>
        </div>
      </PostBottom>
    );
  };

  const TalkResult = (
    <ResultWrapper>
      <div className="community-section">
        <div className="title">
          도수톡
          <span className="list-length"> {communityList.count}</span>건
        </div>
        {communityList.results.map((post) => (
          <div
            className="link"
            onClick={() => postClickHandler(post.uuid)}
            key={post.uuid}
          >
            <PostCard review={post} bottom={renderPostBottom(post)} />
          </div>
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
        <MoreButtonWrapper>
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
    <Layout header={<SearchHeader onInput={onInput} inputText={inputText} />}>
      <>
        <Tab
          tabList={TabList}
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

  .link {
    cursor: pointer;
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

const PostBottom = styled.div`
  .post-bottom {
    display: flex;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.md};
    line-height: ${(props) => props.theme.lineHeights.md};

    .heart {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }

    .comment {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
  }
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
