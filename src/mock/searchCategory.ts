export const SELECT_LIST = [
  {
    title: "인기순",
    key: "-view_count",
  },
  {
    title: "후기 많은순",
    key: "-article_count",
  },
  {
    title: "추천 많은순",
    key: "-up_count",
  },
  {
    title: "거리순",
    key: "distance",
  },
];

export interface ListItem {
  title: string;
  key: string;
}
