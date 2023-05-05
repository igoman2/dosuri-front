import React, { useState } from "react";

import Button from "@/components/Button";
import Float from "@/components/domain/Community/Float";
import Header from "@/components/Layout/Header";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import ModalFactory from "@/components/domain/Community/Write/Review/ModalFactory";
import { NextSeo } from "next-seo";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";
import { useTheme } from "@emotion/react";
import ReviewSection from "@/components/domain/Community/ReviewSection";
import { Tab } from "@/types/community";
import { Tablist } from "@/constants/Tab";
import SearchBar from "@/components/domain/Search/SearchBar";

const Community = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<Tab>(Tablist[0]);
  const [scrollDir] = useDirection();
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState<"question" | "review">("question");

  const onWriteHandler = () => {
    setModalType("review");
    setIsActive(true);
  };

  const onTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const handleActive = (val: boolean) => {
    setIsActive(val);
  };

  const handleModalType = (val: "question" | "review") => {
    setModalType(val);
  };

  return (
    <Layout
      header={
        <Header
          left={true}
          center={
            <SearchBar
              inputText=""
              placeHolder="병원, 지역, 후기 키워드 검색하기"
            />
          }
          right={
            <div onClick={onWriteHandler} css={{ cursor: "pointer" }}>
              <Icon name="write" />
            </div>
          }
        />
      }
    >
      <NextSeo
        title="도수톡 | 도수리-도수치료 리얼후기"
        canonical={`https://www.dosuri.site/community`}
        openGraph={{
          url: `https://www.dosuri.site/community`,
        }}
      />

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
        <ReviewSection currentTab={currentTab} />

        <Float
          scrollDir={scrollDir}
          distance="8.5rem"
          onClick={() => {
            setModalType("review");
            setIsActive(true);
          }}
        />
        {isActive && (
          <ModalFactory
            isActive={isActive}
            setIsActive={handleActive}
            modalType={modalType}
            setModalType={handleModalType}
          />
        )}
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
