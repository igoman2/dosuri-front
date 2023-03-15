import { queryClient } from "@/service/react-query/queryClient";
import { registerReview } from "@/service/apis/community";
import { useMutation } from "react-query";
import { queryKeys } from "@/service/react-query/constants";

export function useRegisterReview() {
  const { mutate } = useMutation(registerReview, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.community, "getCommunityListKeyword"],
        refetchInactive: true,
      });
    },
  });
  return { mutate };
}
