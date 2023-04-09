import React, { FC } from "react";
import BriefcaseIcon from "@/public/assets/briefcase.png";
import LocationIcon from "@/public/assets/location.png";
import HomeIcon from "@/public/assets/home.png";
import Image from "next/image";

export interface AddressType {
  type: string;
  text: string;
}

const AddressType: FC<AddressType> = ({ type, text }) => {
  return (
    <div
      css={{
        border: "solid lightGrey",
        // width: "94px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        css={{
          padding: "0 34px",
        }}
      >
        <div
          css={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Image
            src={
              type === "home"
                ? HomeIcon
                : type === "company"
                ? BriefcaseIcon
                : LocationIcon
            }
            alt="address-type-icon"
            width={13}
            height={13}
          ></Image>
        </div>
        <div
          css={{
            textAlign: "center",
            marginTop: "1.75px",
            fontSize: "14px", // 폰트 사이즈 어케 해요??
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};
export default AddressType;
