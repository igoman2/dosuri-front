import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Divider from "@/components/UI/Divider";
import { pointHistory } from "@/mock/pointHistory";
import { withAuthentication } from "@/pages/withAuthenticate";
import styled from "@emotion/styled";
import { NextPageContext } from "next";
import React from "react";

const Point = () => {
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <PointWrapper>
        <div className="sub-title">내 포인트 2,000P</div>
        <ul className="list-section">
          <Divider height={1} />

          {pointHistory.map((history) => {
            return (
              <>
                <li>
                  <div>
                    <div>{history.date}</div>
                    <div>{history.content}</div>
                  </div>
                  <div>{history.point}</div>
                </li>
                <Divider height={1} />
              </>
            );
          })}
        </ul>
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

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return { props: {} };
  }
);
