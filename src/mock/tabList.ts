export const TabList: TabItem[] = [
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

export interface TabItem {
  title: string;
  value: string;
}
