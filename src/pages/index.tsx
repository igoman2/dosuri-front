import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import Checkbox from "@/components/UI/Checkbox";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
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

      <Checkbox text="도수치료" />
      <Checkbox text="도수치료" />
    </Layout>
  );
};

export default Home;
