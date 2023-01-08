import { getMyCurrentPoint } from "@/service/apis/user";
import { useQuery } from "react-query";

export function useGetMyCurrentPoint() {
  const { data: currentPoint } = useQuery(
    "getMyCurrentPoint",
    getMyCurrentPoint
  );
  return { currentPoint };
}
