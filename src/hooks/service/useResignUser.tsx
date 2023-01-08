import { logout } from "@/pages/withauth";
import { resignUser } from "@/service/apis/user";
import { useMutation } from "react-query";

export function useResignUser() {
  const { mutate } = useMutation(resignUser, {
    onSuccess: () => {
      logout();
    },
  });
  return { mutate };
}
