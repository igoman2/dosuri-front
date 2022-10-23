import Button from "@/components/Button";
import ReviewCard from "@/components/Card/ReviewCard";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import { reviews } from "@/mock/reviews";
import { useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import Link from "next/link";
import React, { useState } from "react";

const Tablist = ["전체보기", "치료후기만 보기", "질문/상담만 보기"];

const Community = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<string>("전체보기");

  const onTabClick = (tab: string) => {
    setCurrentTab(tab);
  };

  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <>
        <div className="tab">
          <ButtonWrapper>
            {Tablist.map((tab, i) => (
              <Button
                key={i}
                text={tab}
                backgroundColor={theme.colors.white}
                color={
                  tab === currentTab ? theme.colors.purple : theme.colors.grey
                }
                border={
                  tab === currentTab
                    ? `0.1rem solid ${theme.colors.purple}`
                    : `0.1rem solid ${theme.colors.grey}`
                }
                dense
                onClick={() => onTabClick(tab)}
              />
            ))}
          </ButtonWrapper>
        </div>

        {reviews.map((review, i) => (
          <Link href={`review/${review.id}`} key={i}>
            <a>
              <ReviewCard review={review} />
            </a>
          </Link>
        ))}
      </>
    </Layout>
  );
};

export default Community;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 0.5rem 0 1.5rem 0;
`;
