export const hospitalTime: HispitalTime[] = [
  {
    date: "월",
    time: "10:00 ~ 20:00",
  },
  {
    date: "화",
    time: "10:00 ~ 20:00",
  },
  {
    date: "수",
    time: "10:00 ~ 20:00",
  },
  {
    date: "목",
    time: "10:00 ~ 20:00",
  },
  {
    date: "금",
    time: "10:00 ~ 20:00",
  },
  {
    date: "토",
    time: "10:00 ~ 20:00",
  },
  {
    date: "일",
    time: "휴진",
  },
];

export interface HispitalTime {
  date: string;
  time: string;
}
