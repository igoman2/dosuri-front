import React from "react";
import FooterItem from "./FooterItem";
import homeIcon from "@/public/assets/home.png";
import crossIcon from "@/public/assets/cross.png";
import buubleIcon from "@/public/assets/speechbubble_circle.png";
import personIcon from "@/public/assets/person.png";

const Footer = () => {
  return (
    <nav
      css={{
        backgroundColor: " rgb(255, 255, 255)",
        position: "sticky",
        bottom: "0",
        height: "6.5rem",
        width: "100%",
        zIndex: 10,
        borderTop: "0.1rem solid rgb(214, 214, 214)",
      }}
    >
      <div
        css={{
          display: "flex",
        }}
      >
        <FooterItem text="홈" image={homeIcon} />
        <FooterItem text="병원찾기" image={crossIcon} />
        <FooterItem text="도수톡" image={buubleIcon} />
        <FooterItem text="마이페이지" image={personIcon} />
      </div>
    </nav>
  );
};

export default Footer;
