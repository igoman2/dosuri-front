import React, { useMemo } from "react";

import HospitalCard from "@/components/Card/HospitalCard";
import { IHospitalInfoResponse } from "@/service/types";
import InfiniteScroll from "react-infinite-scroller";
import Link from "next/link";
import api from "@/service/axiosConfig";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "react-query";
import { useRouter } from "next/router";

type LoadMore = (page: number) => void;

const KeywordHospitals = () => {
  const router = useRouter();

  const initialUrl = useMemo(() => {
    return `/hospital/v1/hospitals?search=${router.query.keyword}`;
  }, []);

  const fetchUrl = async (url: string) => {
    const response = await api.get<IHospitalInfoResponse>(url);
    return response.data;
  };

  const {
    data: hospitals,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    ["hospitalByKeyword", router.query.keyword],
    ({ pageParam = initialUrl }) => fetchUrl(pageParam),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.next || undefined;
      },
    }
  );

  const hospitalClickHandler = (id: string) => {
    router.push({
      pathname: `/hospital/${id}`,
    });
  };

  return (
    <div>
      <ResultWrapper>
        <div className="hospital-section">
          <div className="title">
            병원
            <span className="list-length"> {hospitals?.pages[0].count}</span>건
          </div>
          <InfiniteScroll
            loadMore={fetchNextPage as LoadMore}
            hasMore={hasNextPage}
          >
            {hospitals?.pages.map((pageData) => {
              return pageData.results.map((hospital) => {
                return (
                  <div
                    className="link"
                    onClick={() => hospitalClickHandler(hospital.uuid)}
                    key={hospital.uuid}
                  >
                    <HospitalCard hospitalInfo={hospital} />
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

export default KeywordHospitals;
const ResultWrapper = styled.div`
  .hospital-section {
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
