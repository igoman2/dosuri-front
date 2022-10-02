import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <div
        css={{
          display: "flex",
          gap: "20px",
          fontSize: "16px",
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
    </Layout>
  );
};

export default Home;
