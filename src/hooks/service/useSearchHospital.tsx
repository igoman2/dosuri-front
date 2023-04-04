import { IHospitalInfoResult } from "@/types/service";
import { getHospitalList } from "@/service/apis/hospital";
import { useQuery } from "react-query";

interface UseSearchHospital {
  searchedHospitalList: IHospitalInfoResult[];
}

interface IUseSearchHospitalProps {
  isInput: boolean;
  query: string;
  page_size?: number;
}

export function useSearchHospital({
  query,
  isInput,
  page_size,
}: IUseSearchHospitalProps): UseSearchHospital {
  const fallback: IHospitalInfoResult[] = [];

  const { data: searchedHospitalList } = useQuery({
    queryKey: ["searchedHospital", query],
    queryFn: async () => {
      const data = await getHospitalList({
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
