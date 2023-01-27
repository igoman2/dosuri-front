import React, { useCallback, useEffect, useMemo, useState } from "react";

import Button from "@/components/Button";
import Float from "@/components/UI/Float";
import Header from "@/components/Layout/Header";
import { IHotCommunityResponse } from "@/service/types";
import Icon from "@/util/Icon";
import InfiniteScroll from "react-infinite-scroller";
import Layout from "@/components/Layout";
import ModalFactory from "@/components/Write/Review/ModalFactory";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import api from "@/service/axiosConfig";
import { createReviewState } from "@/components/Write/Review/store";
import { scrollState } from "@/store/searchOption";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";
import { useInfiniteQuery } from "react-query";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";

const Tablist: Tab[] = [
  {
    title: "전체보기",
    value: "all",
  },
  {
    title: "치료후기만 보기",
    value: "review",
  },
  {
    title: "질문/상담만 보기",
    value: "question",
  },
];

type Tab = {
  title: "전체보기" | "치료후기만 보기" | "질문/상담만 보기";
  value: "all" | "review" | "question";
};

const Community = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<Tab>(Tablist[0]);
  const [scrollDir] = useDirection();
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState("");

  const router = useRouter();

  const [scrollY, setScrollY] = useRecoilState(scrollState);

  const onScroll = useCallback((event: Event) => {
    setScrollY(window.pageYOffset);
  }, []);

  useEffect(() => {
    if (window) {
      window.scrollTo(0, scrollY);

      window.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", onScroll);
      };
    }
  }, [scrollY]);

  const initialUrl = useMemo(() => {
    return `/community/v1/community/articles?article_type=${currentTab.value}&ordering=-created_at`;
  }, [currentTab]);

  const fetchUrl = async (url: string) => {
    const response = await api.get<IHotCommunityResponse>(url);
    return response.data;
  };

  const {
    data: communityList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["getCommunityListKeyword", currentTab],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
      staleTime: 1000,
      cacheTime: 1000,
    }
  );

  const onWriteHandler = () => {
    setModalType("review");
    setIsActive(true);
  };

  const onTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const postClickHandler = (id: string) => {
    router.push({
      pathname: `/community/${id}`,
    });
  };

  const fetchNextList = () => {
    if (isFetching) {
      return;
    }
    fetchNextPage();
  };

  const handleActive = (val: boolean) => {
    setIsActive(val);
  };

  const handleModalType = (val: string) => {
    setModalType(val);
  };

  const [reviewState, setReviewState] = useRecoilState(createReviewState);

  return (
    <Layout
      header={
        <Header
          left={true}
          center={true}
          right={
            <div onClick={onWriteHandler} css={{ cursor: "pointer" }}>
              <Icon name="write" />
            </div>
          }
        />
      }
    >
      <>
        <div className="tab">
          <ButtonWrapper>
            {Tablist.map((tab, i) => (
              <Button
                key={i}
                text={tab.title}
                backgroundColor={theme.colors.white}
                color={
                  tab.title === currentTab.title
                    ? theme.colors.purple
                    : theme.colors.grey
                }
                border={
                  tab.title === currentTab.title
                    ? `0.1rem solid ${theme.colors.purple}`
                    : `0.1rem solid ${theme.colors.grey}`
                }
                dense
                onClick={() => onTabClick(tab)}
              />
            ))}
          </ButtonWrapper>
        </div>
        <div>
          <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
            {communityList?.pages.map((pageData) => {
              return pageData.results.map((talk) => {
                return (
                  <div
                    className="link"
                    onClick={() => postClickHandler(talk.uuid)}
                    key={talk.uuid}
                  >
                    <PostCard
                      review={talk}
                      bottom={<PostBottom review={talk} type="list" />}
                    />
                  </div>
                );
              });
            })}
          </InfiniteScroll>
        </div>

        <Float
          scrollDir={scrollDir}
          distance="8.5rem"
          onClick={() => {
            setModalType("review");
            setIsActive(true);
          }}
        />
        {isActive && (
          <ModalFactory
            isActive={isActive}
            setIsActive={handleActive}
            modalType={modalType}
            setModalType={handleModalType}
          />
        )}
      </>
    </Layout>
  );
};

export default Community;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 0.5rem 0 1.5rem 0;
`;
