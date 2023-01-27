import { ITreatmentKeywordsResult } from "@/service/types";
import { getTreatmentKeywords } from "@/service/apis/community";
import { useQuery } from "react-query";

interface UseSearchTreatments {
  treatmentKeywords: ITreatmentKeywordsResult[];
  isSuccess: boolean;
}

interface IUseSearchTreatmentsProps {
  page_size?: number;
}

export function useSearchTreatments({
  page_size,
}: IUseSearchTreatmentsProps): UseSearchTreatments {
  const fallback: ITreatmentKeywordsResult[] = [];

  const { data: treatmentKeywords, isSuccess } = useQuery({
    queryKey: ["treatment-keyword"],
    queryFn: async () => {
      const data = await getTreatmentKeywords({ page_size });
      return data.results;
    },
  });

  return { treatmentKeywords: treatmentKeywords ?? fallback, isSuccess };
}
