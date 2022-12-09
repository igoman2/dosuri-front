import PostCard from "@/components/Card/PostCard";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import Layout from "@/components/Layout";
import Tab from "@/components/Tab";
import { posts } from "@/mock/posts";
import { TabItem, TabList } from "@/mock/tabList";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import HospitalCard from "@/components/Card/HospitalCard";
import {
  HospitalInfo,
  hospitalList,
  IHospitalInfo,
  IHospitalInfoResponse,
} from "@/mock/hospitals";
import Button from "@/components/Button";
import { useTheme } from "@emotion/react";
import Image from "next/image";
import ArrowRight from "@/public/assets/arrow-right-bold.png";
import SearchHeader from "@/components/Layout/Header/SearchHeader";
import { getHospitalList } from "@/service/apis";
import { AxiosError } from "axios";
import { useQuery } from "react-query";

const SearchResult = () => {
  const [inputText, setInputText] = useState("");
  const [currentTab, setCurrentTab] = useState<TabItem>(TabList[0]);
  const router = useRouter();
  const theme = useTheme();
  const [hospitals, setHospitals] =
    useState<IHospitalInfoResponse | null>(null);

  const { isLoading: getHispitalListIsLoading, data: getHispitalListData } =
    useQuery<IHospitalInfoResponse, AxiosError>({
      queryKey: ["getHospitalList-keyword"],
      queryFn: async () => {
        const data = await getHospitalList();
        return data;
      },
      retry: 0,
      onSuccess: (res) => {
        setHospitals(res);
        console.log(res.results);
      },
      onError: (err: any) => {
        setHospitals(err.response.data);
      },
    });
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

  const HospitalResult = (
    <ResultWrapper>
      <div className="hospital-section">
        <div className="title">
          병원
          <span className="list-length"> 10</span>건
        </div>

        {hospitals?.results.map((hospital: IHospitalInfo, i) => (
          <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
            <a>
              <HospitalCard hospitalInfo={hospital} />
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
          <span className="list-length"> 30</span>건
        </div>
        {posts.map((post, i) => (
          <Link href={`community/${post.id}`} key={i}>
            <a>
              <PostCard post={post} bottom={<PostBottom post={post} />} />
            </a>
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
        {currentTab.value === "hospital" && HospitalResult}
        {currentTab.value === "talk" && TalkResult}
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
