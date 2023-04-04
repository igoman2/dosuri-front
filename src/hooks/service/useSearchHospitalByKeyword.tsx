import { IHospitalInfoResult } from "@/types/service";
import { getHospitalListByKeyword } from "@/service/apis/hospital";
import { useQuery } from "react-query";

interface UseSearchHospitalByKeyword {
  searchedHospitalList: IHospitalInfoResult[];
}

interface IUseSearchHospitalByKeywordProps {
  isInput: boolean;
  query: string;
  page_size?: number;
}

export function useSearchHospitalByKeyword({
  query,
  isInput,
  page_size,
}: IUseSearchHospitalByKeywordProps): UseSearchHospitalByKeyword {
  const fallback: IHospitalInfoResult[] = [];

  const { data: searchedHospitalList } = useQuery({
    queryKey: ["searchedHospitalByKeyword", query],
    queryFn: async () => {
      const data = await getHospitalListByKeyword({
        search: query,
        page_size,
      });
      return data.results;
    },
    suspense: false,
    enabled: isInput,
  });

  return { searchedHospitalList: searchedHospitalList ?? fallback };
}
