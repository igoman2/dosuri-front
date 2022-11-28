import Image from "next/image";
import React, { FC, useState } from "react";
import logo from "@/public/assets/logo1.png";
import note from "@/public/assets/note.png";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import FullModalBase from "@/components/Modal/FullModalBase";
import WriteQuesiton from "@/components/Write/Question";

interface IHeaderProps {
  left?: boolean;
  center?: boolean;
  right?: boolean;
}

const Header: FC<IHeaderProps> = ({ left, center, right }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onWriteHandler = () => {
    setIsActive(true);
  };
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
      <div className="center">
        {center && (
          <Link href="/search/input">
            <a>
              <SearchBar />
            </a>
          </Link>
        )}
      </div>
      <div>
        {right && (
          <Image
            src={note}
            alt="register"
            width={28}
            height={28}
            onClick={onWriteHandler}
          />
        )}
      </div>

      <FullModalBase
        isActive={isActive}
        onClose={() => setIsActive(false)}
        title="질문/상담 쓰기"
      >
        <WriteQuesiton />
      </FullModalBase>
    </div>
  );
};

export default Header;
