import ImageTextView from "@/components/CustomImage/ImageTextView";
import Divider from "@/components/Divider/Divider";
import { MAP_SELECT_LIST, MapListItem } from "@/mock/searchCategory";
import Icon from "@/util/Icon";
import styled from "@emotion/styled";
import React, { useState } from "react";
import { BottomSheet } from "react-spring-bottom-sheet";
import { useRecoilState } from "recoil";
import { searchModalState } from "../Search/store";

interface IFilterSectionProps {
  category: MapListItem;
  setCategory: (item: MapListItem) => void;
}

const FilterSection = ({ category, setCategory }: IFilterSectionProps) => {
  const [open, setOpen] = useState(false);
  function onDismiss() {
    setOpen(false);
  }
  const [modalState, setModalState] = useRecoilState(searchModalState);

  const onListClick = (item: MapListItem) => {
    onDismiss();
    setTimeout(() => {
      setCategory(item);
    }, 100);
  };
  return (
    <div>
      <ImageTextViewWrapper>
        <div onClick={() => setOpen(true)}>
          <ImageTextView
            text={category.title}
            border
            image={<Icon name={`chevron`} height="12" width="12" />}
          />
        </div>
        <div onClick={() => setModalState(true)}>
          <ImageTextView
            text="필터"
            border
            image={<Icon name={`chevron`} height="12" width="12" />}
          />
        </div>
      </ImageTextViewWrapper>
      {open && (
        <BottomSheet
          css={{
            zIndex: 100,
          }}
          open={open}
          onDismiss={onDismiss}
          snapPoints={({ minHeight }) => [minHeight + 65]}
        >
          {MAP_SELECT_LIST.map((item, i) => {
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
    </div>
  );
};

export default FilterSection;

const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 2rem;
  z-index: 100;

  .list-title {
    padding: 1rem 0;
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
  }
`;

const ImageTextViewWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin: 0.5rem 0 1rem 1rem;
`;
