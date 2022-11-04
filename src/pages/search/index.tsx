import HospitalCard from "@/components/Card/HospitalCard";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import { useTheme } from "@emotion/react";
import React, { useState } from "react";
import styled from "@emotion/styled";
import ImageTextView from "@/components/UI/ImageTextView";
import Image from "next/image";
import ChevronDowm from "@/public/assets/chevron-down.png";
import { BottomSheet } from "react-spring-bottom-sheet";
import "react-spring-bottom-sheet/dist/style.css";
import Divider from "@/components/UI/Divider";
import { ListItem, SELECT_LIST } from "@/mock/searchCategory";
import { HospitalInfo, hospitalList } from "@/mock/hospitals";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(SELECT_LIST[0]);
  function onDismiss() {
    setOpen(false);
  }
  const theme = useTheme();

  const onListClick = (item: ListItem) => {
    setCategory(item);
    onDismiss();
  };

  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
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
          따끈한 후기가 새로 등록됐어요!
        </div>

        {hospitalList.map((hospital: HospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
        ))}
      </div>
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
          후기는 다다익선! 치료 후기 많은 곳
        </div>

        {hospitalList.map((hospital: HospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
        ))}
      </div>
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

        <ImageTextViewWrapper onClick={() => setOpen(!open)}>
          <ImageTextView
            text={category.title}
            image={
              <Image
                src={ChevronDowm}
                height={12}
                width={12}
                alt="chevron-down"
              />
            }
          />
        </ImageTextViewWrapper>

        {hospitalList.map((hospital: HospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
        ))}
      </div>

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
    </Layout>
  );
};

export default Home;

const ImageTextViewWrapper = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1rem;
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
