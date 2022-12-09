import Button from "@/components/Button";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Checkbox from "@/components/UI/Checkbox";
import { withAuthentication } from "@/pages/withAuthenticate";
import styled from "@emotion/styled";
import { Field, Form, Formik } from "formik";
import { NextPageContext } from "next";
import React from "react";

interface MyFormValues {
  firstName: string;
}

const Secession = () => {
  const initialValues: MyFormValues = { firstName: "" };

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <SecessionWrapper>
        <div className="sub-title">회원 탈퇴</div>
        <div className="setting-layout">
          <div className="section-mid">
            <div className="information">
              회원 탈퇴 시, 회원 정보와 포인트, 작성한 글 등 모든 정보가
              삭제되며 복구할 수 없습니다.
            </div>
            <div className="question">탈퇴하시는 이유가 무엇인가요?</div>
            <CheckboxWrapper>
              <Checkbox text="서비스가 마음에 들지 않아요." />
              <Checkbox text="다른 서비스를 주로 사용해요." />
              <Checkbox text="정보가 충분하지 않아요." />
              <Checkbox text="다른 계정으로 이용하고 있어요." />
              <Checkbox text="탈퇴 후 재가입 하고 싶어요." />
              <Checkbox text="기타" />
            </CheckboxWrapper>
            <Formik
              initialValues={initialValues}
              onSubmit={(values, actions) => {
                console.log({ values, actions });
                actions.setSubmitting(false);
              }}
            >
              <Form>
                <Field
                  className="field"
                  component="textarea"
                  id="secession-reason"
                  name="secession-reason"
                  placeholder="탈퇴 사유를 적어주세요 (20자 이상)"
                />
              </Form>
            </Formik>
          </div>
          <div className="section-bottom">
            <Checkbox text="모든 정보를 삭제하는 것에 동의합니다." />
            <div className="save-button-wrapper">
              <Button text="탈퇴하기" width="100%" />
            </div>
          </div>
        </div>
      </SecessionWrapper>
    </Layout>
  );
};

export default Secession;

const SecessionWrapper = styled.div`
  height: calc(100vh - 6rem);
  display: flex;
  flex-direction: column;

  .setting-layout {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .sub-title {
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .information {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    margin-bottom: 4rem;
  }

  .question {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 1.5rem;
  }

  .field {
    width: 100%;
    height: 8rem;
    border-radius: 0.5rem;
    border: 0.1rem solid ${(props) => props.theme.colors.grey};
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    flex-grow: 1;
    padding: 1rem;
    vertical-align: top;

    &::placeholder {
      color: ${(props) => props.theme.colors.grey};
    }
  }

  .save-button-wrapper {
    margin-top: 1.5rem;
    padding: 1rem 0;
  }
`;

const CheckboxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 1rem;
`;

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return { props: {} };
  }
);
