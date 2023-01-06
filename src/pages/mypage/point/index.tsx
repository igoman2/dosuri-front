import Divider from "@/components/UI/Divider";
import { EmptyText } from "@/components/UI/emotion/EmptyText";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import React from "react";
import { formatDate_YYYY_MM_DD } from "@/util/format";
import styled from "@emotion/styled";
import { usePointHistory } from "@/hooks/service/usePointHistory";

const Point = () => {
  const { pointHistories } = usePointHistory();
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <PointWrapper>
        <div className="sub-title">내 포인트 2,000P</div>
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
                    <div>{history.modify_point}</div>
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
