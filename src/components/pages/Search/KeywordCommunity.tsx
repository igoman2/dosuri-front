import { IHospitalReviewsResult, IHotCommunityResponse } from "@/service/types";
import React, { useMemo } from "react";

import Icon from "@/util/Icon";
import InfiniteScroll from "react-infinite-scroller";
import Link from "next/link";
import PostCard from "@/components/Card/PostCard";
import api from "@/service/axiosConfig";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";

type LoadMore = (page: number) => void;

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

  return (
    <div>
      <ResultWrapper>
        <div className="community-section">
          <div className="title">
            도수톡
            <span className="list-length"> {talks?.pages[0].count}</span>건
          </div>
          <InfiniteScroll
            loadMore={fetchNextPage as LoadMore}
            hasMore={hasNextPage}
          >
            {talks?.pages.map((pageData) => {
              return pageData.results.map((talk) => {
                return (
                  <div
                    className="link"
                    onClick={() => postClickHandler(talk.uuid)}
                    key={talk.uuid}
                  >
                    <PostCard review={talk} bottom={renderPostBottom(talk)} />
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
