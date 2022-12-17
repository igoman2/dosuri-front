import { ListItem, SELECT_LIST } from "@/mock/searchCategory";
import React, { useState } from "react";

import { BottomSheet } from "react-spring-bottom-sheet";
import ChevronDowm from "@/public/assets/chevron-down.png";
import Divider from "@/components/UI/Divider";
import HospitalCard from "@/components/Card/HospitalCard";
import { IHospitalInfo } from "@/mock/hospitals";
import Image from "next/image";
import ImageTextView from "@/components/UI/ImageTextView";
import { getHospitalList } from "@/service/apis";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useTheme } from "@emotion/react";

const AllFilterSection = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(SELECT_LIST[0]);

  function onDismiss() {
    setOpen(false);
  }

  const onListClick = (item: ListItem) => {
    onDismiss();
    setTimeout(() => {
      setCategory(item);
    }, 10);
  };

  const { data: getHospitalListData3 } = useQuery({
    queryKey: ["getHospitalList-search-3", category],
    queryFn: async () => {
      const data = await getHospitalList({
        ordering: category.key,
      });
      return data.results;
    },
    retry: 0,
  });

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

        <ImageTextViewWrapper onClick={() => setOpen(true)}>
          <ImageTextView
            text={category.title}
            border
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

        {getHospitalListData3?.map((hospital: IHospitalInfo, i) => (
          <HospitalCard hospitalInfo={hospital} key={i} />
        ))}
      </div>

      <BottomSheet
        open={open}
        onDismiss={onDismiss}
        snapPoints={({ minHeight }) => [minHeight + 65]}
      >
        <button onClick={onDismiss}>asd</button>
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
    </>
  );
};

export default AllFilterSection;

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
