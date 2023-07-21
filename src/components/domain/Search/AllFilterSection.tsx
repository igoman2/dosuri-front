import { ListItem, SELECT_LIST } from "@/mock/searchCategory";
import React, { memo, useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { BottomSheet } from "react-spring-bottom-sheet";
import Divider from "@/components/Divider/Divider";
import HospitalCard from "@/components/Card/HospitalCard";
import { IHospitalInfoResponse } from "@/types/service";
import Icon from "@/util/Icon";
import InfiniteScroll from "react-infinite-scroller";
import Link from "next/link";
import api from "@/service/axiosConfig";
import { locationState } from "@/store/location";
import { queryKeys } from "@/service/react-query/constants";
import { searchFilterState } from "@/store/searchOption";
import styled from "@emotion/styled";
import { useInfiniteQuery } from "react-query";
import { useTheme } from "@emotion/react";
import ImageTextView from "@/components/CustomImage/ImageTextView";
import { rankViewState } from "../Hospital/store";
import SearchHospitalModal from "./FilterOptionModal";
import { searchModalState } from "./store";
import FilterOptionModal from "./FilterOptionModal";

const AllFilterSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useRecoilState(searchFilterState);
  const [category, setCategory] = useState(searchFilter);
  const location = useRecoilValue(locationState);
  const rankState = useRecoilValue(rankViewState);
  const resetRankState = useResetRecoilState(rankViewState);
  const [mode, setMode] = useRecoilState(searchModalState);

  function onDismiss() {
    setOpen(false);
  }

  const onListClick = (item: ListItem) => {
    onDismiss();
    setTimeout(() => {
      if (rankState.viewRanking) {
        resetRankState();
      }
      setCategory(item);
    }, 100);
  };

  useEffect(() => {
    setSearchFilter(category);
  }, [category]);

  const initialUrl = useMemo(() => {
    if (category.key === "distance") {
      return `/hospital/v1/hospitals?latitude=${location.lat}&longitude=${location.lng}&ordering=${category.key}`;
    } else if (category.key === "avg_price_per_hour") {
      return `/hospital/v1/hospitals-address-filtered-avg-price?ordering=${category.key}`;
    } else {
      return `/hospital/v1/hospitals-address-filtered?ordering=${category.key}`;
    }
  }, [category, location]);

  useEffect(() => {
    if (rankState.viewRanking) {
      setCategory({
        title: "치료비 낮은순",
        key: "avg_price_per_hour",
      });
    }
  }, [rankState]);

  const fetchUrl = async (url: string) => {
    const response = await api.get<IHospitalInfoResponse>(url);
    return response.data;
  };

  const {
    data: hospitalList,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery(
    [queryKeys.hospital, "hospital-by-filter", category],
    ({
      pageParam = rankState.viewRanking
        ? `/hospital/v1/hospitals-address-filtered-avg-price?ordering=${category.key}&longitude=${rankState.nearSiteLongitude}&latitude=${rankState.nearSiteLatitude}`
        : initialUrl,
    }) => fetchUrl(pageParam),
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
    <>
      <div
        css={{
          marginBottom: "2.5rem",
        }}
      >
        <div
          css={{
            fontSize: theme.fontSizes.xl,
            fontWeight: 700,
          }}
        >
          모든 병원 보기
        </div>
        <ImageTextViewWrapper>
          <div onClick={() => setOpen(true)}>
            <ImageTextView
              text={category.title}
              border
              image={<Icon name={`chevron`} height="12" width="12" />}
            />
          </div>
          <div onClick={() => setMode(true)}>
            <ImageTextView
              text="필터"
              border
              image={<Icon name={`chevron`} height="12" width="12" />}
            />
          </div>
        </ImageTextViewWrapper>

        <InfiniteScroll loadMore={fetchNextList} hasMore={hasNextPage}>
          {hospitalList?.pages.map((pageData) => {
            return pageData.results.map((hospital, i) => {
              return (
                <Link href={`hospital/${hospital.uuid}`} key={hospital.uuid}>
                  <a>
                    <div css={{ marginTop: "1rem" }}>
                      <HospitalCard
                        hospitalInfo={hospital}
                        type={
                          category.key === "avg_price_per_hour"
                            ? "price"
                            : "review"
                        }
                      />
                    </div>
                  </a>
                </Link>
              );
            });
          })}
        </InfiniteScroll>
      </div>

      {/* 
      TODO: 필터 사용 후 바텀 슬라이더가 먹통 되는 이슈가 있음. open에 따라 아예 재렌더링 시켜서 회피

      */}
      {open && (
        <BottomSheet
          open={open}
          onDismiss={onDismiss}
          snapPoints={({ minHeight }) => [minHeight + 65]}
        >
          {SELECT_LIST.map((item, i) => {
            {
              return (
                <SelectList key={i} onClick={() => onListClick(item)}>
                  <span className="list-title">{item.title}</span>
                  <Divider height={1} />
                </SelectList>
              );
            }
          })}
        </BottomSheet>
      )}
      <FilterOptionModal />
    </>
  );
};

export default memo(AllFilterSection);

const ImageTextViewWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
`;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;

  .list-title {
    padding: 1rem 0;
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
  }
`;
