import { useQuery } from "react-query";
import { useRecoilState } from "recoil";

import { getUser } from "@/service/apis/user";
import { queryKeys } from "@/service/react-query/constants";
import { userInfoState } from "@/store/user";
import { UserInfo, UserSettingInfo } from "@/types/user";

interface UseUser {
  user: UserInfo & UserSettingInfo;
}

export function useUser(accessToken?: string): UseUser {
  const [_, setUserInfo] = useRecoilState(userInfoState);

  const fallback: UserInfo & UserSettingInfo = {
    uuid: "",
    nickname: "",
    name: "",
    birthday: "",
    phone_no: "",
    address: {
      name: "",
      uuid: "",
      address: "",
      address_type: "",
      latitude: 0,
      longitude: 0,
    },
    sex: "",
    unread_notice: false,
    pain_areas: [],
    setting: {
      agree_marketing_personal_info: false,
      agree_general_push: false,
      agree_marketing_push: false,
      agree_marketing_email: false,
      agree_marketing_sms: false,
    },
  };
  const { data: user } = useQuery(
    [queryKeys.user, "getUserInfo"],
    () => getUser(accessToken),
    {
      cacheTime: 9000,
    }
  );

  return { user: user ?? fallback };
}
