export const SELECT_LIST = [
  // {
  //   title: "인기순",
  //   key: "-view_count",
  // },
  {
    title: "후기 많은순",
    key: "-article_count",
  },
  {
    title: "치료비 낮은순",
    key: "avg_price_per_hour",
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

export const MAP_SELECT_LIST: MapListItem[] = [
  { title: "치료비 (60분)", key: "price" },
  {
    title: "후기 개수",
    key: "review",
  },
];

export interface MapListItem {
  title: "후기 개수" | "치료비 (60분)";
  key: "review" | "price";
}
