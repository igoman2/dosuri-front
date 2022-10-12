import Button from "@/components/Button";
import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import CardModal from "@/components/Modal/CardModal";
import ModalBase from "@/components/Modal/ModalBase";
import Checkbox from "@/components/UI/Checkbox";
import type { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";

const Home: NextPage = () => {
  const [isActive, setIsActive] = useState(false);

  const onClickModalOn = () => {
    setIsActive(true);
  };

  const onClickModalOff = () => {
    setIsActive(false);
  };

  const onClickCardRemove = () => {
    alert("이벤트 실행");
  };
  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <div
        css={{
          display: "flex",
          gap: "2rem",
          fontSize: "1.6rem",
        }}
      >
        <Link href="/home">
          <a>홈</a>
        </Link>
        {/* 애플 로그인 버튼 스크립트 refetch를 위해 a 태그로 캐시 무효화 */}
        <a href="/login">로그인</a>
        <Link href="/register">
          <a>회원가입</a>
        </Link>
      </div>
      <Button text="모달창 띄우기 버튼" onClick={onClickModalOn} />
      <ModalBase active={isActive} closeEvent={onClickModalOff}>
        <CardModal
          closeEvent={onClickModalOff}
          title="내 후기 삭제하기"
          actionMsg="삭제"
          actionEvent={onClickCardRemove}
        >
          후기의 내용과 댓글이 모두 삭제되며, 삭제한 후기는 복구할 수 없습니다.
          정말로 삭제하시겠어요?
          <br />
          삭제한 초대장은 복구 할 수 없습니다.
        </CardModal>
      </ModalBase>

      <Checkbox text="도수치료" />
      <Checkbox text="도수치료" />
    </Layout>
  );
};

export default Home;
