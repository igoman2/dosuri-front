import Image from "next/image";
import React, { FC, useState } from "react";
import logo from "@/public/assets/logo1.png";
import note from "@/public/assets/note.png";
import SearchBar from "@/components/SearchBar";
import Link from "next/link";
import WriteQuesiton from "@/components/Write/Question";
import WriteReview from "@/components/Write/Review";
import { useSetRecoilState } from "recoil";
import { modalContentState, modalState } from "@/components/Modal/store";

interface IHeaderProps {
  left?: boolean;
  center?: boolean;
  right?: boolean;
}

const Header: FC<IHeaderProps> = ({ left, center, right }) => {
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState("");
  const setModalIsActive = useSetRecoilState(modalState);
  const setModalContent = useSetRecoilState(modalContentState);

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
    setModalContent({
      title: "후기 작성을 취소하시겠어요?",
      content: `
      작성을 취소할 경우 지금까지 입력한 내용이 모두 사라집니다.`,
      actionString: "계속 작성",
    });
    setModalIsActive((prev) => ({
      action: () => {
        setModalIsActive((prev) => ({ ...prev, isActive: false }));
      },
      isActive: true,
    }));
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
