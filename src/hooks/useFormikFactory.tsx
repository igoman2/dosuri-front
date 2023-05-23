import * as Yup from "yup";

import { formatDate_YYYYMMDD, formatPhoneNumber_00000000 } from "@/util/format";

import { AddressType, UserInfo } from "@/types/user";

interface MyFormValues {
  name?: string;
  email?: string;
  nickname: string;
  birthday: string;
  phone: string;
  sex: string;
  address: {
    uuid: string;
    name: string;
    address: string;
    address_type: AddressType;
    latitude: number;
    longitude: number;
  };
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
    address: user.address ?? {},
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
      address: Yup.object()
        .shape({
          uuid: Yup.string(),
          name: Yup.string().required(),
          address: Yup.string().required(),
          address_type: Yup.string().required(),
          latitude: Yup.number().required(),
          longitude: Yup.number().required(),
        })
        .required(),
      pain_areas: Yup.array().min(1).required(),
    }),
  };
};

export default useFormikFactory;
