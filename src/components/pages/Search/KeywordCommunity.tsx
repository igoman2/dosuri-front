import React, { useMemo } from "react";

import { IHotCommunityResponse } from "@/service/types";
import InfiniteScroll from "react-infinite-scroller";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import api from "@/service/axiosConfig";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";

const KeywordCommunity = () => {
  const router = useRouter();

  const initialUrl = useMemo(() => {
    return `/community/v1/community/articles?search=${router.query.keyword}`;
  }, []);

  const fetchUrl = async (url: string) => {
    const response = await api.get<IHotCommunityResponse>(url);
    return response.data;
  };

  const {
    data: talks,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    ["talksByKeyword", router.query.keyword],
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
    <div>
      <ResultWrapper>
        <div className="community-section">
          <div className="title">
            도수톡
            <span className="list-length"> {talks?.pages[0].count}</span>건
          </div>
          <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
            {talks?.pages.map((pageData) => {
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
      </ResultWrapper>
    </div>
  );
};

export default KeywordCommunity;

const ResultWrapper = styled.div`
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
