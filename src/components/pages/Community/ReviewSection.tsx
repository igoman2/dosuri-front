import PostCard from "@/components/Card/PostCard";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import api from "@/service/axiosConfig";
import { queryKeys } from "@/service/react-query/constants";
import { IHotCommunityResponse } from "@/service/types";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

const Tablist: Tab[] = [
  {
    title: "전체",
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
  title: "전체" | "치료후기만 보기" | "질문/상담만 보기";
  value: "all" | "review" | "question";
};

const ReviewSection = () => {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState<Tab>(Tablist[0]);
  useScrollRestoration();

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
    [queryKeys.community, "getCommunityListKeyword", currentTab],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
    }
  );

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

  return (
    <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
      {communityList?.pages.map((pageData) => {
        return pageData.results.map((talk) => {
          return (
            <div
              css={{
                cursor: "pointer",
              }}
              onClick={() => postClickHandler(talk.uuid)}
              key={talk.uuid}
            >
              <PostCard
                review={talk}
                hasBackground={true}
                bottom={<PostBottom review={talk} type="list" />}
              />
            </div>
          );
        });
      })}
    </InfiniteScroll>
  );
};

export default ReviewSection;
