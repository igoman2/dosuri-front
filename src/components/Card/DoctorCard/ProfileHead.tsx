import React from "react";

import { IGetDoctorListResult } from "@/types/service";
import Image from "next/image";
import styled from "@emotion/styled";
import ImageFallback from "@/components/CustomImage/ImageFallback";

export interface IProfileHeadProps {
  doctor: IGetDoctorListResult;
}

const ProfileHead = ({ doctor }: IProfileHeadProps) => {
  return (
    <div className="profile">
      <span className="doctor-image">
        {doctor.attachments.length > 0 ? (
          <Image
            style={{
              borderRadius: "50%",
            }}
            src={doctor.attachments[0]?.signed_path}
            width={90}
            height={90}
            alt="hospitalImage"
          />
        ) : (
          <ImageFallback width="9rem" height="9rem" circle />
        )}
      </span>

      <div className="detail">
        <div className="name">{`${doctor.name} ${doctor.title}`}</div>
        <div className="major">
          <div>{doctor.subtitle}</div>
        </div>
        <div className="tags">{doctor.hospital_name}</div>
      </div>
    </div>
  );
};

export default ProfileHead;
