import { likePost } from "@/service/apis/community";
import { queryClient } from "@/service/react-query/queryClient";
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
    },
  });
  return { mutate };
}
