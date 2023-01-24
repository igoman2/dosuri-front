import { IHospitalReviewsResult } from "@/service/types";

export const isListView = (arg: any): arg is IHospitalReviewsResult => {
  return arg.comment_count !== undefined;
};
