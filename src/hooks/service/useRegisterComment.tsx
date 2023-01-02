import {
  registerComment,
  registerThreadComment,
} from "@/service/apis/community";

import { queryClient } from "@/service/react-query/queryClient";
import { useMutation } from "react-query";

export function useRegisterComment(isThread: boolean) {
  const { mutate } = useMutation(
    isThread ? registerThreadComment : registerComment,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getCommunityPostDetail");
      },
    }
  );
  return { mutate };
}
