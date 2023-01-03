import { createSearchHistory } from "@/service/apis/hospital";
import { queryClient } from "@/service/react-query/queryClient";
import { useMutation } from "react-query";

export function useCreateSearchHistory() {
  const { mutate } = useMutation(createSearchHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["recentSearchList"]);
    },
  });
  return { mutate };
}
