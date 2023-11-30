import React, { FC, useMemo } from "react";

import DoctorCard from "@/components/Card/DoctorCard";
import { EmptyText } from "@/components/etc/emotion/EmptyText";
import { IGetHospitalInfo } from "@/types/service";
import { getDoctorList } from "@/service/apis/hospital";
import styled from "@emotion/styled";
import { useQuery } from "react-query";
import { useTheme } from "@emotion/react";

interface IDoctorsProps {
  hospitalData: IGetHospitalInfo;
}

const Doctors: FC<IDoctorsProps> = ({ hospitalData }) => {
  const theme = useTheme();
  const { data } = useQuery({
    queryKey: ["getDoctorList", hospitalData.uuid],
    queryFn: async () => {
      const data = await getDoctorList(hospitalData.uuid);

      return data.results;
    },
    staleTime: 3000,
    retry: 0,
  });

  const doctors = useMemo(() => {
    return data?.filter((doctor) => doctor.position !== "치료사");
  }, [data]);
  const subDoctors = useMemo(() => {
    return data?.filter((doctor) => doctor.position === "치료사");
  }, [data]);

  return (
    <DoctorsWrapper>
      <div
        css={{
          margin: "2rem 0",
          fontSize: theme.fontSizes.lg,
          color: theme.colors.grey_dark,
        }}
      >
        프로필 카드를 누르면 자세한 정보를 볼 수 있어요
      </div>
      <div>
        <div className="title-doctor">의사</div>
        {doctors?.length !== 0 ? (
          <div>
            {doctors
              ?.filter((doctor) => doctor.position !== "치료사")
              .map((doctor) => (
                <DoctorCard doctor={doctor} isLink key={doctor.uuid} />
              ))}
          </div>
        ) : (
          <EmptyText>등록된 의사 프로필이 없습니다.</EmptyText>
        )}
      </div>

      <div>
        <div className="title-doctor sub">치료사</div>
        {subDoctors?.length !== 0 ? (
          <div>
            {subDoctors
              ?.filter((subDoctor) => subDoctor.position === "치료사")
              .map((subDoctor) => (
                <DoctorCard doctor={subDoctor} isLink key={subDoctor.uuid} />
              ))}
          </div>
        ) : (
          <EmptyText>등록된 치료사 프로필이 없습니다.</EmptyText>
        )}
      </div>
    </DoctorsWrapper>
  );
};

export default Doctors;

const DoctorsWrapper = styled.div`
  .title-doctor {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 700;
    color: ${(props) => props.theme.colors.purple};
    margin-bottom: 1rem;

    &.sub {
      margin-top: 2.5rem;
    }
  }
`;
