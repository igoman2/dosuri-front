import { UserInfo } from "@/types/user";
import { getUser } from "@/service/apis/user";
import { queryKeys } from "@/service/react-query/constants";
import { useQuery } from "react-query";

interface UseUser {
  user: UserInfo;
}

export function useUser(accessToken?: string): UseUser {
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
    pain_areas: [],
  };
  const { data: user } = useQuery(
    [queryKeys.user],
    () => getUser(accessToken),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );

  return { user: user ?? fallback };
}
