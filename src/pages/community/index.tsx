import React, { useState } from "react";

import Button from "@/components/Button";
import Float from "@/components/UI/Float";
import Header from "@/components/Layout/Header";
import { IHospitalReviewsResult } from "@/service/types";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostBottom from "@/components/UI/emotion/PostBottom";
import PostCard from "@/components/Card/PostCard";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";
import { useGetCommunity } from "@/hooks/service/usegetCommunityList";
import { useTheme } from "@emotion/react";

const Tablist: Tab[] = [
  {
    title: "전체보기",
    value: "all",
  },
  {
    title: "치료후기만 보기",
    value: "review",
  },
  {
    title: "질문/상담만 보기",
    value: "question",
  },
];

type Tab = {
  title: "전체보기" | "치료후기만 보기" | "질문/상담만 보기";
  value: "all" | "review" | "question";
};

const Community = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<Tab>(Tablist[0]);
  const [scrollDir] = useDirection();

  const onTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const { communityList } = useGetCommunity({
    article_type: currentTab.value,
  });

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
    <Layout header={<Header left={true} center={true} right={true} />}>
      <>
        <div className="tab">
          <ButtonWrapper>
            {Tablist.map((tab, i) => (
              <Button
                key={i}
                text={tab.title}
                backgroundColor={theme.colors.white}
                color={
                  tab.title === currentTab.title
                    ? theme.colors.purple
                    : theme.colors.grey
                }
                border={
                  tab.title === currentTab.title
                    ? `0.1rem solid ${theme.colors.purple}`
                    : `0.1rem solid ${theme.colors.grey}`
                }
                dense
                onClick={() => onTabClick(tab)}
              />
            ))}
          </ButtonWrapper>
        </div>

        {communityList.results.map((review, i) => (
          <Link href={`community/${review.uuid}`} key={i}>
            <a>
              <PostCard review={review} bottom={renderPostBottom(review)} />
            </a>
          </Link>
        ))}

        <Float scrollDir={scrollDir} distance="8.5rem" />
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
