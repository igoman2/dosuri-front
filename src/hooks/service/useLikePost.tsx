import { likePost } from "@/service/apis/community";
import { queryClient } from "@/service/react-query/queryClient";
import { queryKeys } from "@/service/react-query/constants";
import { useMutation } from "react-query";

export function useLikePost() {
  const { mutate } = useMutation(likePost, {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getCommunityListKeyword"],
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["getCommunityPostDetail"],
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["getHotCommunity"],
        refetchInactive: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["talksByKeyword"],
        refetchInactive: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["getHospitalReviews"],
        refetchInactive: true,
      });

      queryClient.invalidateQueries({
        queryKey: ["getMyReviewDetail"],
        refetchInactive: true,
      });

      queryClient.invalidateQueries({
        queryKey: [queryKeys.community],
        refetchInactive: true,
      });
    },
  });
  return { mutate };
}
