import { getHospitalList } from "@/service/apis/hospital";
import { IHospitalInfoResult } from "@/service/types";
import { useQuery } from "react-query";

interface UseSearchHospital {
  searchedHospitalList: IHospitalInfoResult[];
}

interface IUseSearchHospitalProps {
  isInput: boolean;
  query: string;
}

export function useSearchHospital({
  query,
  isInput,
}: IUseSearchHospitalProps): UseSearchHospital {
  const fallback: IHospitalInfoResult[] = [];

  const { data: searchedHospitalList } = useQuery({
    queryKey: ["searchHospital", query],
    queryFn: async () => {
      const data = await getHospitalList({
        search: query,
      });
      return data.results;
    },
    suspense: false,
    enabled: !isInput,
  });

  return { searchedHospitalList: searchedHospitalList ?? fallback };
}
