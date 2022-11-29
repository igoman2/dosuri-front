import Image from "next/image";
import React, { FC, useState } from "react";
import logo from "@/public/assets/logo1.png";
import note from "@/public/assets/note.png";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import FullModalBase from "@/components/Modal/FullModalBase";
import WriteQuesiton from "@/components/Write/Question";
import WriteReview from "@/components/Write/Review";

interface IHeaderProps {
  left?: boolean;
  center?: boolean;
  right?: boolean;
}

const Header: FC<IHeaderProps> = ({ left, center, right }) => {
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState("");
  const onWriteHandler = () => {
    setModalType("question");
    setIsActive(true);
  };

  const onSwapModalType = () => {
    setIsActive(false);
    setModalType("review");
    setIsActive(true);
  };

  const changeActiveHandler = () => {
    setIsActive(false);
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

      {modalType === "question" ? (
        <WriteQuesiton
          onSwap={onSwapModalType}
          isActive={isActive}
          onChangeActive={changeActiveHandler}
        />
      ) : (
        <WriteReview isActive={isActive} onChangeActive={changeActiveHandler} />
      )}
    </div>
  );
};

export default Header;
