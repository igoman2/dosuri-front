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
    getMyPointHistory
  );

  return { pointHistories: pointHistories ?? fallback };
}
