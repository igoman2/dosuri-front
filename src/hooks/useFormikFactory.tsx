import * as Yup from "yup";

import { formatDate_YYYYMMDD, formatPhoneNumber_00000000 } from "@/util/format";

import { UserInfo } from "@/types/user";

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

const useFormikFactory = (user: UserInfo) => {
  const initialValues: MyFormValues = {
    name: user.name ?? "",
    email: user.username ?? "",
    nickname: user.nickname ?? "",
    birthday: formatDate_YYYYMMDD(user.birthday),
    phone: formatPhoneNumber_00000000(user.phone_no),
    sex: user.sex ?? "",
    largeArea: user.address.large_area ?? "",
    smallArea: user.address.small_area ?? "",
    pain_areas: user.pain_areas ?? "",
  };
  return {
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string(),
      email: Yup.string(),
      nickname: Yup.string().min(2).max(10).required(),
      phone: Yup.string().length(8).required(),
      birthday: Yup.string().length(8).required(),
      sex: Yup.string().required(),
      largeArea: Yup.string().required(),
      smallArea: Yup.string().required(),
      pain_areas: Yup.array().min(1).required(),
    }),
  };
};

export default useFormikFactory;
