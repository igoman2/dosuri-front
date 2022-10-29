export interface Menu {
  title: string;
  path: string;
  iconName: string;
}

export const menus: Menu[] = [
  {
    title: "홈",
    path: "/",
    iconName: "home",
  },
  {
    title: "병원찾기",
    path: "/search",
    iconName: "cross",
  },
  {
    title: "도수톡",
    path: "/community",
    iconName: "talk",
  },
  {
    title: "마이페이지",
    path: "/mypage",
    iconName: "profile",
  },
];
