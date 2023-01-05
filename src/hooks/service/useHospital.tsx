import { IGetHospitalListParams } from "@/service/types";
import { getHospitalList } from "@/service/apis/hospital";
import { useQuery } from "react-query";

export function useHospital(params: IGetHospitalListParams, tab: string) {
  const { data: hospitals } = useQuery({
    queryKey: ["searchedHospital", params.search, tab],
    queryFn: async () => {
      const data = await getHospitalList(params);
      return data;
    },
    suspense: false,
  });
  return { hospitals };
}
