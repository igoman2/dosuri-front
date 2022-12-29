import { getUser } from "@/service/apis/user";
import { queryKeys } from "@/service/react-query/constants";
import { UserInfo } from "@/types/user";
import { useQuery } from "react-query";

interface UseUser {
  user: UserInfo;
}

export function useUser(accessToken?: string): UseUser {
  const fallback: UserInfo = {
    uuid: "",
    nickname: "",
    birthday: "",
    phone_no: "",
    address: {
      large_area: "",
      small_area: "",
    },
    sex: "",
    pain_areas: [],
  };
  const { data: user } = useQuery([queryKeys.user], () => getUser(accessToken));

  return { user: user ?? fallback };
}
