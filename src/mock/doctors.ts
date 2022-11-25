export const doctors: Doctor[] = [
  {
    id: 1,
    profileImage:
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/doctorProfile.png",
    name: "남호석",
    title: "대표원장",
    major: "마취통증의학과 전문의",
    tags: ["도수", "마취", "비수술"],
    description: ["세브란스 병원 수련", "비수술 척추 치료 최고 의사 선정"],
  },
  {
    id: 2,
    profileImage:
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/doctorProfile.png",
    name: "김철민",
    title: "원장",
    major: "마취통증의학과 전문의",
    tags: ["도수", "마취", "비수술"],
    description: [],
  },
];

export const subDoctors: Doctor[] = [
  {
    id: 3,
    profileImage:
      "https://dosuri-images.s3.ap-northeast-2.amazonaws.com/doctorProfile.png",
    name: "민경훈",
    title: "치료사",
    major: "마취통증의학과 전문의",
    tags: ["도수", "마취", "비수술"],
    description: ["종합병원 치료사 근무", "10년 경력 베테랑"],
  },
];

export interface Doctor {
  id: number;
  profileImage: string;
  name: string;
  title: string;
  major: string;
  tags: string[];
  description: string[];
}
