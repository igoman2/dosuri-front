import { queryClient } from "@/service/react-query/queryClient";
import { registerReview } from "@/service/apis/community";
import { useMutation } from "react-query";

export function useRegisterReview() {
  const { mutate } = useMutation(registerReview, {
    onSuccess: () => {
      queryClient.invalidateQueries(["getCommunityListKeyword"]);
    },
  });
  return { mutate };
}
