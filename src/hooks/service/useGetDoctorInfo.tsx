import { getDoctorInfo } from "@/service/apis/hospital";
import { getMyCurrentPoint } from "@/service/apis/user";
import { queryKeys } from "@/service/react-query/constants";
import { IGetDoctorListResult } from "@/types/service";
import { useQuery } from "react-query";

interface IUseGetDoctorInfo {
  doctorId: string;
}

export function useGetDoctorInfo({ doctorId }: IUseGetDoctorInfo) {
  const fallback = {} as IGetDoctorListResult;
  const { data: doctorInfo } = useQuery(
    [queryKeys.hospital, "getDoctorInfo"],
    () => getDoctorInfo(doctorId),
    {
      staleTime: 0,
      cacheTime: 0,
    }
  );
  if (!doctorInfo) return { doctorInfo: fallback };

  return { doctorInfo };
}
