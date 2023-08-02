import { Tab, TabItem } from "@/types/community";

export const Tablist: Tab[] = [
  {
    title: "전체",
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

export const HospitalInfoTabList: TabItem[] = [
  {
    title: "병원정보",
    value: "information",
  },
  {
    title: "의료진",
    value: "doctors",
  },
  {
    title: "치료후기",
    value: "reviews",
  },
  {
    title: "비용정보",
    value: "price",
  },
];

export const SearchTabList: TabItem[] = [
  {
    title: "전체",
    value: "all",
  },
  {
    title: "병원",
    value: "hospital",
  },
  {
    title: "도수톡",
    value: "talk",
  },
];
