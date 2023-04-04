import { IHospitalReviewsResult } from "@/types/service";

export const isListView = (arg: any): arg is IHospitalReviewsResult => {
  return arg.comment_count !== undefined;
};
