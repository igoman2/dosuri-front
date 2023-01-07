import * as Yup from "yup";

import { formatDate_YYYYMMDD, formatPhoneNumber_00000000 } from "@/util/format";

import { UserInfo } from "@/types/user";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/user";

interface MyFormValues {
  name?: string;
  email?: string;
  nickname: string;
  birthday: string;
  phone: string;
  sex: string;
  largeArea: string;
  smallArea: string;
  pain_areas: {
    name: string;
  }[];
}

const useFormikFactory = (formType: "register" | "edit") => {
  const userInfo = useRecoilValue<UserInfo>(userInfoState);

  if (formType === "register") {
    const initialValues: MyFormValues = {
      nickname: "",
      birthday: "",
      phone: "",
      sex: "",
      largeArea: "",
      smallArea: "",
      pain_areas: [],
    };
    return {
      initialValues,
      validationSchema: Yup.object({
        nickname: Yup.string().min(2).max(15).required(),
        phone: Yup.string().length(8).required(),
        birthday: Yup.string().length(8).required(),
        sex: Yup.string().required(),
        largeArea: Yup.string().required(),
        smallArea: Yup.string().required(),
        pain_areas: Yup.array().min(1).required(),
      }),
    };
  } else {
    const initialValues: MyFormValues = {
      name: userInfo.name ?? "",
      email: userInfo.username ?? "",
      nickname: userInfo.nickname ?? "",
      birthday: formatDate_YYYYMMDD(userInfo.birthday),
      phone: formatPhoneNumber_00000000(userInfo.phone_no),
      sex: userInfo.sex ?? "",
      largeArea: userInfo.address.large_area ?? "",
      smallArea: userInfo.address.small_area ?? "",
      pain_areas: userInfo.pain_areas ?? "",
    };
    return {
      initialValues,
      validationSchema: Yup.object({
        name: Yup.string(),
        email: Yup.string(),
        nickname: Yup.string().min(2).max(15).required(),
        phone: Yup.string().length(8).required(),
        birthday: Yup.string().length(8).required(),
        sex: Yup.string().required(),
        largeArea: Yup.string().required(),
        smallArea: Yup.string().required(),
        pain_areas: Yup.array().min(1).required(),
      }),
    };
  }
};

export default useFormikFactory;
