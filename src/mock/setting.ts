export const settings: Setting[] = [
  {
    title: "광고 알림",
    isActive: false,
  },
  {
    title: "일반 알림",
    isActive: true,
  },
  {
    title: "SMS 마케팅 동의",
    isActive: false,
  },
  {
    title: "이메일 마케팅 동의",
    isActive: true,
  },
];

interface Setting {
  title: string;
  isActive: boolean;
}
