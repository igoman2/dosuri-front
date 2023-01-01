import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import RegisterForm from "@/components/Register";

const Edit: React.FC<{}> = () => {
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <RegisterForm formType="edit" />
    </Layout>
  );
};

export default Edit;
