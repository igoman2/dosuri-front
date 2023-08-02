import React, { FC } from "react";

import { IGetDoctorListResult } from "@/types/service";
import Image from "next/image";
import styled from "@emotion/styled";
import theme from "@/styles/theme";
import Link from "next/link";
import ProfileHead from "./ProfileHead";

export interface IDoctorCardProps {
  doctor: IGetDoctorListResult;
  isLink: boolean;
}

const DoctorCard: FC<IDoctorCardProps> = ({ doctor, isLink }) => {
  return (
    <DoctorCardWrapper>
      {isLink ? (
        <Link href={`/hospital/doctor/${doctor.uuid}`}>
          <a>
            <ProfileHead doctor={doctor} />
          </a>
        </Link>
      ) : (
        <ProfileHead doctor={doctor} />
      )}
    </DoctorCardWrapper>
  );
};

export default DoctorCard;

const DoctorCardWrapper = styled.div`
  min-width: 9rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;

  .profile {
    display: flex;
  }

  .doctor-image {
    margin-right: 1rem;
  }

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  .name {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 700;
  }

  .major {
    display: flex;
    gap: 10;
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }

  .tags {
    display: flex;
    gap: 1rem;
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
  }
`;
