import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import { NextSeo } from "next-seo";
import RegisterForm from "@/components/domain/Mypage/Register";

const Edit: React.FC<{}> = () => {
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <NextSeo title="마이페이지 | 도수리-도수치료 리얼후기" />

      <RegisterForm formType="edit" />
    </Layout>
  );
};

export default Edit;
