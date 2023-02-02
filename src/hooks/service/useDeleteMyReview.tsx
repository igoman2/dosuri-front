import { deleteCommunityPostDetail } from "@/service/apis/community";
import { useMutation } from "react-query";

export function useDeleteMyReview() {
  const { mutate } = useMutation(deleteCommunityPostDetail);
  return { mutate };
}
