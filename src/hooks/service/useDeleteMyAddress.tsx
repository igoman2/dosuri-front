import { deleteMyAddress } from "@/service/apis/user";
import { useMutation } from "react-query";

export function useDeleteMyAddress() {
  const { mutate } = useMutation(deleteMyAddress);
  return { mutate };
}
