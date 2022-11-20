import SampleImage from "@/public/assets/sample.png";
import { StaticImageData } from "next/image";
import { ReactNode } from "react";

export const hospitalList: HospitalInfo[] = [
  {
    id: 1,
    title: "압구정강남바른정형외과의원",
    location: "신사동",
    reviewConut: 1,
    thunbCount: 11,
    recentReview: "친절한 의료진과 주차가 편합니다",
    hospitalImage: SampleImage,
  },
  {
    id: 2,
    title: "두발로병원",
    location: "압구정동",
    reviewConut: 0,
    thunbCount: 0,
    recentReview: null,
    hospitalImage: SampleImage,
  },
  {
    id: 3,
    title: "압구정강남바른정형외과의원",
    location: "신사동",
    reviewConut: 1,
    thunbCount: 11,
    recentReview: "친절한 의료진과 주차가 편합니다",
    hospitalImage: SampleImage,
  },
];

export interface HospitalInfo {
  id: number;
  title: string;
  location: string;
  reviewConut: number;
  thunbCount: number;
  recentReview: ReactNode | string | null;
  hospitalImage: StaticImageData; // 서버에서 받아오는거로 변경할 예정
}
