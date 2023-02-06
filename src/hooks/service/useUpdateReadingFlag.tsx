import { updateNoticeReadingFlag } from "@/service/apis/user";
import { useMutation } from "react-query";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/store/user";

export function useUpdateReadingFlag() {
  const [_, setUserInfo] = useRecoilState(userInfoState);
  const { mutate } = useMutation(updateNoticeReadingFlag, {
    onSuccess: (resp) => {
      setUserInfo((prev) => {
        return {
          ...prev,
          unread_notice: resp.unread_notice,
        };
      });
    },
  });
  return { mutate };
}
