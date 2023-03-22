import PostCard from "@/components/Card/PostCard";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import useScrollRestoration from "@/hooks/useScrollRestoration";
import api from "@/service/axiosConfig";
import { queryKeys } from "@/service/react-query/constants";
import { IHotCommunityResponse } from "@/service/types";
import Link from "next/link";
import React, { FC, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";

type Tab = {
  title: "전체" | "치료후기만 보기" | "질문/상담만 보기";
  value: "all" | "review" | "question";
};

interface IReviewSectionProps {
  currentTab: Tab;
}

const ReviewSection: FC<IReviewSectionProps> = ({ currentTab }) => {
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
            <Link href={`/community/${talk.uuid}`} key={talk.uuid}>
              <a>
                <PostCard
                  review={talk}
                  hasBackground={true}
                  bottom={<PostBottom review={talk} type="list" />}
                />
              </a>
            </Link>
          );
        });
      })}
    </InfiniteScroll>
  );
};

export default ReviewSection;
