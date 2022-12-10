import React, { useState } from "react";

import Button from "@/components/Button";
import Float from "@/components/UI/Float";
import Header from "@/components/Layout/Header";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import { posts } from "@/mock/posts";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";
import { useTheme } from "@emotion/react";

const Tablist = ["전체보기", "치료후기만 보기", "질문/상담만 보기"];

const Community = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<string>("전체보기");
  const [scrollDir] = useDirection();

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

        {posts.map((post, i) => (
          <Link href={`community/${post.id}`} key={i}>
            <a>
              <PostCard post={post} bottom={<PostBottom post={post} />} />
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
