import { ITreatmentKeywordsResult } from "@/types/service";
import { useQuery } from "react-query";
import {
  getLocationByCoordinate,
  getLocationByKeyword,
} from "@/service/apis/location";

export function useGetLocationByKeyword(keyword: string) {
  const fallback: ITreatmentKeywordsResult[] = [];

  const { data: location, isSuccess } = useQuery({
    queryKey: ["getLocationByKeyword"],
    queryFn: async () => {
      const data = await getLocationByKeyword({ query: keyword });
      return data.documents;
    },
    enabled: !!keyword,
  });

  return { location: location ?? fallback, isSuccess };
}

export function useGetLocationByCoordinate(
  longitude: number,
  latitude: number
) {
  const fallback: ITreatmentKeywordsResult[] = [];

  const isEnable = () => {
    if (longitude === 0 || latitude === 0) {
      return false;
    }
    if (!longitude && !latitude) {
      return false;
    }

    return true;
  };

  const enabled = isEnable();

  const { data: location, isSuccess } = useQuery({
    queryKey: ["getLocationByCoordinate"],
    enabled: enabled,
    queryFn: async () => {
      const data = await getLocationByCoordinate({ longitude, latitude });
      return data.documents;
    },
    staleTime: 0,
    cacheTime: 0,
  });

  return { location: location ?? fallback, isSuccess };
}
