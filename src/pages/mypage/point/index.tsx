import Divider from "@/components/UI/Divider";
import { EmptyText } from "@/components/UI/emotion/EmptyText";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import { NextSeo } from "next-seo";
import React from "react";
import { formatDate_YYYY_MM_DD } from "@/util/format";
import styled from "@emotion/styled";
import { useGetMyCurrentPoint } from "@/hooks/service/useGetMyCurrentPoint";
import { usePointHistory } from "@/hooks/service/usePointHistory";

const Point = () => {
  const { pointHistories } = usePointHistory();
  const { currentPoint } = useGetMyCurrentPoint();
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <NextSeo title="마이페이지 | 도수리-도수치료 리얼후기" />

      <PointWrapper>
        <div className="sub-title">
          내 포인트 {currentPoint?.total_point.toLocaleString()}P
        </div>
        {pointHistories.count > 0 ? (
          <ul className="list-section">
            <Divider height={1} />

            {pointHistories.results.map((history) => {
              return (
                <>
                  <li>
                    <div>
                      <div>{formatDate_YYYY_MM_DD(history.created_at)}</div>
                      <div>{history.content}</div>
                    </div>
                    <div>
                      {history.modify_point < 0
                        ? history.modify_point.toLocaleString()
                        : `+${history.modify_point.toLocaleString()}`}
                      P
                    </div>
                  </li>
                  <Divider height={1} />
                </>
              );
            })}
          </ul>
        ) : (
          <EmptyText>포인트 내역이 없습니다.</EmptyText>
        )}
      </PointWrapper>
    </Layout>
  );
};

export default Point;

const PointWrapper = styled.div`
  .sub-title {
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 2.5rem;
  }

  .list-section {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};

    li {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;

      div {
        display: flex;
        gap: 1rem;
      }
    }
  }
`;
