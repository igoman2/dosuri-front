import { getMyPointHistory } from "@/service/apis/user";
import { useQuery } from "react-query";

export function usePointHistory() {
  const fallback = {
    count: 0,
    next: "",
    previous: "",
    results: [],
  };
  const { data: pointHistories } = useQuery(
    "myPointHistory",
    getMyPointHistory,
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );

  return { pointHistories: pointHistories ?? fallback };
}
