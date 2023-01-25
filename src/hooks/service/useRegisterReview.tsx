import { registerReview } from "@/service/apis/community";
import { useMutation } from "react-query";

export function useRegisterReview() {
  const { mutate } = useMutation(registerReview);
  return { mutate };
}
