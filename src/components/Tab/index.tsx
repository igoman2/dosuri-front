import { TabItem } from "@/mock/tabList";
import styled from "@emotion/styled";
import React, { FC } from "react";

interface ITabProps {
  tabList: TabItem[];
  currentTab: TabItem;
  onTabClickHander: (tab: TabItem) => void;
}

const Tab: FC<ITabProps> = ({ currentTab, tabList, onTabClickHander }) => {
  return (
    <TabWrapper>
      {tabList.map((tab, i) => (
        <div
          key={i}
          onClick={() => onTabClickHander(tab)}
          className={currentTab.title === tab.title ? "current" : ""}
        >
          {tab.title}
        </div>
      ))}
    </TabWrapper>
  );
};

export default Tab;

const TabWrapper = styled.div`
  display: flex;
  gap: 3rem;
  font-size: ${(props) => props.theme.fontSizes.xl};
  line-height: ${(props) => props.theme.lineHeights.xl};
  cursor: pointer;

  .current {
    font-weight: 700;
    border-bottom: 0.3rem solid ${(props) => props.theme.colors.purple};
  }
`;
