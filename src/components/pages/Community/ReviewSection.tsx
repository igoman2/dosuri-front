import PostCard from "@/components/Card/PostCard";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import api from "@/service/axiosConfig";
import { queryKeys } from "@/service/react-query/constants";
import { IHotCommunityResponse } from "@/service/types";
import React, { FC, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import _ from "lodash";
import ModalPostCard from "@/components/Card/PostCard/ModalPostCard";
import ReviewBanner from "@/components/UI/ReviewBanner";

type Tab = {
  title: "전체" | "치료후기만 보기" | "질문/상담만 보기";
  value: "all" | "review" | "question";
};

interface IReviewSectionProps {
  currentTab: Tab;
}

const ReviewSection: FC<IReviewSectionProps> = ({ currentTab }) => {
  const router = useRouter();

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

  const detailId = useMemo(() => {
    return router.query.id;
  }, [router]);
  const showDetailModal = !_.isNil(detailId);

  return (
    <>
      <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
        {communityList?.pages.map((pageData, index1) => {
          return pageData.results.map((talk, index2) => {
            return (
              <>
                <ReviewBanner parentIndex={index1} childIndex={index2} />
                <Link
                  href={`/community?id=${talk.uuid}`}
                  as={`/community/${talk.uuid}`}
                  scroll={false}
                  shallow={true}
                  key={talk.uuid}
                >
                  <a>
                    <PostCard
                      review={talk}
                      hasBackground={true}
                      bottom={<PostBottom review={talk} type="list" />}
                    />
                  </a>
                </Link>
              </>
            );
          });
        })}
      </InfiniteScroll>
      {showDetailModal && <ModalPostCard postId={detailId as string} />}
    </>
  );
};

export default ReviewSection;
