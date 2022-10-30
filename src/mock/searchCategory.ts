export const SELECT_LIST = [
  {
    title: "인기 순",
    key: "popularity",
  },
  {
    title: "후기 많은 순",
    key: "review",
  },
  {
    title: "추천 많은 순",
    key: "recommend",
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
