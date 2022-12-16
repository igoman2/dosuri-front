import React, { FC, useMemo } from "react";

import DoctorCard from "@/components/Card/DoctorCard";
import { IGetHospitalInfo } from "@/service/types";
import { getDoctorList } from "@/service/apis";
import styled from "@emotion/styled";
import { useQuery } from "react-query";

interface IDoctorsProps {
  hospitalData: IGetHospitalInfo;
}

const Doctors: FC<IDoctorsProps> = ({ hospitalData }) => {
  const { data } = useQuery({
    queryKey: ["getDoctorList"],
    queryFn: async () => {
      const data = await getDoctorList(hospitalData.uuid);

      return data.results;
    },
    staleTime: 3000,
    retry: 0,
  });

  const doctors = useMemo(() => {
    return data?.filter((doctor) => doctor.title !== "치료사");
  }, [data]);
  const subDoctors = useMemo(() => {
    return data?.filter((doctor) => doctor.title === "치료사");
  }, [data]);

  if (!data) {
    return <div>loading</div>;
  }

  return (
    <DoctorsWrapper>
      <div>
        <div className="title-doctor">의사</div>
        {doctors
          ?.filter((doctor) => doctor.title !== "치료사")
          .map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.uuid} />
          ))}
      </div>

      <div>
        <div className="title-doctor sub">치료사</div>
        {subDoctors
          ?.filter((doctor) => doctor.title === "치료사")
          .map((doctor) => (
            <DoctorCard doctor={doctor} key={doctor.uuid} />
          ))}
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
      margin-top: 1rem;
    }
  }
`;
