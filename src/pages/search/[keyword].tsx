import Layout from "@/components/Layout";
import Tab from "@/components/Tab";
import { TabItem, TabList } from "@/mock/tabList";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import SearchHeader from "./SearchHeader";

const SearchResult = () => {
  const [inputText, setInputText] = useState("");
  const [currentTab, setCurrentTab] = useState<TabItem>(TabList[0]);
  const router = useRouter();

  const onTabClickHander = (tab: TabItem) => {
    setCurrentTab(tab);
    router.replace({
      pathname: `/search/${router.query.keyword}`,
      query: { keyword: router.query.keyword, tab: tab.value },
    });
  };

  const onInput = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };
  return (
    <Layout header={<SearchHeader onInput={onInput} inputText={inputText} />}>
      <Tab
        tabList={TabList}
        currentTab={currentTab}
        onTabClickHander={onTabClickHander}
      />
    </Layout>
  );
};

export default SearchResult;
