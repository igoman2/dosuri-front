import { deleteSearchHistoryAll } from "@/service/apis/hospital";
import { queryClient } from "@/service/react-query/queryClient";
import { useMutation } from "react-query";

export function useDeleteSearchHistoryAll() {
  const { mutate } = useMutation(deleteSearchHistoryAll, {
    onSuccess: () => {
      queryClient.invalidateQueries(["recentSearchList"]);
    },
  });
  return { mutate };
}
