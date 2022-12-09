import DoctorCard from "@/components/Card/DoctorCard";
import { doctors, subDoctors } from "@/mock/doctors";
import { IGetHospitalInfo } from "@/service/apis";
import styled from "@emotion/styled";
import React, { FC } from "react";

interface IDoctorsProps {
  hospitalData?: IGetHospitalInfo;
}

const Doctors: FC<IDoctorsProps> = ({ hospitalData }) => {
  return (
    <DoctorsWrapper>
      <div>
        <div className="title-doctor">의사</div>
        {doctors.map((doctor) => (
          <DoctorCard doctor={doctor} key={doctor.id} />
        ))}
      </div>

      <div>
        <div className="title-doctor sub">치료사</div>
        {subDoctors.map((doctor) => (
          <DoctorCard doctor={doctor} key={doctor.id} />
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
