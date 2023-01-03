import { IRecentHospitalSearchListResult } from "@/service/types";
import { getRecentHospitalSearchList } from "@/service/apis/hospital";
import { useQuery } from "react-query";

interface UseRecentHospitalSearchList {
  recentSearchedHospitalList: IRecentHospitalSearchListResult[];
}

export function useRecentHospitalSearchList(): UseRecentHospitalSearchList {
  const fallback: IRecentHospitalSearchListResult[] = [];

  const { data: recentSearchedHospitalList } = useQuery({
    queryKey: "recentSearchList",
    queryFn: async () => {
      const data = await getRecentHospitalSearchList({
        page_size: 30,
      });
      return data.results;
    },
  });
  return {
    recentSearchedHospitalList: recentSearchedHospitalList ?? fallback,
  };
}
