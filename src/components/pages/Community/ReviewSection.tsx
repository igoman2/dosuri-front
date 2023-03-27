import PostCard from "@/components/Card/PostCard";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import api from "@/service/axiosConfig";
import { queryKeys } from "@/service/react-query/constants";
import { IHotCommunityResponse } from "@/service/types";
import React, { FC, useEffect, useMemo } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import styled from "@emotion/styled";
import Link from "next/link";
import { useRouter } from "next/router";
import _ from "lodash";
import ModalPostCard from "@/components/Card/PostCard/ModalPostCard";
import Image from "next/image";
import ReviewBanner from "@/public/assets/review-banner.png";

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

  /**
   *
   * @param parentIndex childIndex가 10 늘어날때마다 1씩 증가
   * @param childIndex 무한스크롤에서 한번에 10개씩 받아오므로 1~10이 반복됨
   * @returns Boolean
   */
  const isBannerVisible = (
    parentIndex: number,
    childIndex: number
  ): Boolean => {
    // 처음 5번째
    if (parentIndex === 0 && childIndex === 5) {
      return true;
    }
    // 그 후 20개마다
    // parentIndex !== 0 은 0번째에 나오지 않음을 의미
    else if (parentIndex !== 0 && parentIndex % 2 === 0 && childIndex === 0) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    window.onpopstate = () => {
      router.push(`/community`, `/community`, {
        shallow: true,
        scroll: false,
      });
    };
  }, []);

  return (
    <>
      <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
        {communityList?.pages.map((pageData, index1) => {
          return pageData.results.map((talk, index2) => {
            return (
              <>
                {isBannerVisible(index1, index2) && (
                  <Link href="https://jade-grill-d5b.notion.site/4e50154c10c841b5a1eb9a8aac1355aa">
                    <a target="_blank" rel="noopener noreferrer">
                      <BannerWrapper>
                        <span className="image">
                          <Image
                            src={ReviewBanner}
                            width={250}
                            height={60}
                            alt="review-banner"
                          />
                        </span>
                      </BannerWrapper>
                    </a>
                  </Link>
                )}
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

const BannerWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.purple_light2};
  margin: 0 -2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;

  & .image {
    padding: 0.7rem 0 1.3rem 0;
  }
`;
