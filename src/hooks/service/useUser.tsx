import { UserInfo } from "@/types/user";
import { getUser } from "@/service/apis/user";
import { queryKeys } from "@/service/react-query/constants";
import { useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { userInfoState } from "@/store/user";

interface UseUser {
  user: UserInfo;
}

export function useUser(accessToken?: string): UseUser {
  const [_, setUserInfo] = useRecoilState(userInfoState);

  const fallback: UserInfo = {
    uuid: "",
    nickname: "",
    name: "",
    birthday: "",
    phone_no: "",
    address: {
      large_area: "",
      small_area: "",
    },
    sex: "",
    unread_notice: false,
    pain_areas: [],
  };
  const { data: user } = useQuery(
    [queryKeys.user],
    () => getUser(accessToken),
    {
      cacheTime: 9000,
    }
  );

  return { user: user ?? fallback };
}
