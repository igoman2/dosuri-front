import { deleteSearchHistory } from "@/service/apis/hospital";
import { queryClient } from "@/service/react-query/queryClient";
import { useMutation } from "react-query";

export function useDeleteSearchHistory() {
  const { mutate } = useMutation(deleteSearchHistory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["recentSearchList"]);
    },
  });
  return { mutate };
}
