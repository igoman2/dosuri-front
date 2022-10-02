import Image from "next/image";
import React, { FC } from "react";
import logo from "@/public/assets/logo1.png";
import note from "@/public/assets/note.png";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";

interface IHeaderProps {
  left?: boolean;
  center?: boolean;
  right?: boolean;
}

const Header: FC<IHeaderProps> = ({ left, center, right }) => {
  return (
    <div
      css={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        "& .center": {
          flexGrow: 1,
        },
        height: "4.8rem",
        marginBottom: "1.5rem",
        padding: "0 1rem",
      }}
    >
      <Link href="/">
        <a>{left && <Image src={logo} alt="logo" width={82} height={22} />}</a>
      </Link>
      <div className="center">{center && <SearchBar />}</div>
      <div>
        {right && <Image src={note} alt="register" width={28} height={28} />}
      </div>
    </div>
  );
};

export default Header;
