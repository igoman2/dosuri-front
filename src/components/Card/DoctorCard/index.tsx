import React, { FC } from "react";

import { Doctor } from "@/mock/doctors";
import Image from "next/image";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

export interface IDoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: FC<IDoctorCardProps> = ({ doctor }) => {
  return (
    <DoctorCardWrapper>
      <div className="profile">
        <Image
          style={{
            borderRadius: "50%",
          }}
          src={doctor.profileImage}
          width={90}
          height={90}
          alt="hospitalImage"
        />
        <div className="detail">
          <div className="name">{`${doctor.name} ${doctor.title}`}</div>
          <div className="major">
            <div>{doctor.major}</div>
          </div>
          <div className="tags">
            {doctor.tags.map((tag, i) => {
              return <div key={i}>#{tag}</div>;
            })}
          </div>
        </div>
      </div>
      <div
        css={{
          marginTop: "1rem",
          fontSize: theme.fontSizes.md,
          lineHeight: theme.lineHeights.md,
        }}
      >
        {doctor.description.map((e, i) => (
          <li key={i}>- {e}</li>
        ))}
      </div>
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

  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    margin-left: 1rem;
  }

  .name {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    font-weight: 700;
  }

  .major {
    display: flex;
    color: ${(props) => props.theme.colors.grey};
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
