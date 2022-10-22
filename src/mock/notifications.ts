export const notifications: Notification[] = [
  {
    image: "",
    date: "2022.12.31.",
    title: "도수리",
    description: "후기 인증이 완료되어 1,000P가 지급되었습니다.",
    isRead: false,
  },
  {
    image: "",
    date: "2022.12.31.",
    title: "도수리",
    description: "후기 인증이 완료되어 1,000P가 지급되었습니다.",
    isRead: false,
  },
  {
    image: "",
    date: "2022.12.31.",
    title: "도수리",
    description: "후기 인증이 완료되어 1,000P가 지급되었습니다.",
    isRead: false,
  },
];

interface Notification {
  image: string;
  date: string;
  title: string;
  description: string;
  isRead: boolean;
}
