import React, { FC } from "react";

import { IGetDoctorListResult } from "@/types/service";
import Image from "next/image";
import styled from "@emotion/styled";
import theme from "@/styles/theme";

export interface IDoctorCardProps {
  doctor: IGetDoctorListResult;
}

const DoctorCard: FC<IDoctorCardProps> = ({ doctor }) => {
  return (
    <DoctorCardWrapper>
      <div className="profile">
        <Image
          style={{
            borderRadius: "50%",
          }}
          src={doctor.attachments[0].signed_path}
          width={90}
          height={90}
          alt="hospitalImage"
        />
        <div className="detail">
          <div className="name">{`${doctor.name} ${doctor.title}`}</div>
          <div className="major">
            <div>{doctor.subtitle}</div>
          </div>
          <div className="tags">
            {doctor.descriptions.map((el, i) => {
              return <div key={i}>{`#${el.description}`}</div>;
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
        {doctor.keywords.map((e, i) => (
          <li key={i}>{`- ${e.keyword}`}</li>
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
