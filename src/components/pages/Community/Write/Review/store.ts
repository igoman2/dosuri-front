import { Treatment } from "@/types/community";
import { atom } from "recoil";
import { v4 } from "uuid";

type ReviewState = {
  hospital: { name: string; uuid: string };
  treatmentKeywords: Treatment[];

  content: string;

  treatmentPrice: string;
  treatmentCount: string;
  treatment_effect: string;
  doctor_kindness: string;
  therapist_kindness: string;
  staff_kindness: string;
  clean_score: string;

  article_attachment_assoc: {
    attachment: string;
  }[];

  sensitive_agreement: boolean;
  personal_agreement: boolean;
  status: string;
  auth_attach: {
    attachment: string;
  }[];

  article_type: string;

  detailImages: string[];
  authImages: string[];
};

export const createReviewState = atom<ReviewState>({
  key: `createReviewState${v4()}`,
  default: {
    hospital: {
      name: "",
      uuid: "",
    },
    treatmentKeywords: [],

    content: "",

    treatmentCount: "",
    treatmentPrice: "",
    treatment_effect: "",
    doctor_kindness: "",
    therapist_kindness: "",
    staff_kindness: "",
    clean_score: "",

    article_attachment_assoc: [],
    sensitive_agreement: false,
    personal_agreement: false,
    status: "",
    auth_attach: [],

    article_type: "",

    detailImages: [],
    authImages: [],
  },
  dangerouslyAllowMutability: true,
});

// const treatmentKeywordsSelector = selector({
//   key: "treatmentKeywordsSelector",
//   get: ({ get }) => {
//     const reviewState = get(createReviewState);
//     return reviewState.treatmentKeywords;
//   },
//   set: ({ set }, newValue) => {
//     const target = set(treatmentKeywordsSelector, newValue / 1.609); // 킬로미터를 마일로 변환한다
//   },
// });
