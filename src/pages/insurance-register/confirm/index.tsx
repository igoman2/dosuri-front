import Button from "@/components/Button";
import Layout from "@/components/Layout";
import HeaderInsurance from "@/components/Layout/Header/Depth/HeaderInsurance";
import styled from "@emotion/styled";
import React from "react";
import { useTheme } from "@emotion/react";
import Link from "next/link";
import { withAuthentication } from "@/pages/withAuthenticate";
import { NextPageContext } from "next";

const Confirm = () => {
  const theme = useTheme();
  return (
    <Layout header={<HeaderInsurance />} footer={false}>
      <Content>
        <div>
          <div className="title">
            도수리에 가입된 정보로 실손보험 상담 신청이 완료되었습니다.
          </div>
          <ListElement>
            <div className="key">이름</div>
            <div className="value">한준호</div>
          </ListElement>
          <ListElement>
            <div className="key">핸드폰 번호</div>
            <div className="value">010-9916-4003</div>
          </ListElement>
          <ListElement>
            <div className="key">생년월일</div>
            <div className="value">1996년 10월 31일</div>
          </ListElement>
          <ListElement>
            <div className="key">성별</div>
            <div className="value">남자</div>
          </ListElement>
          <ListElement>
            <div className="key">지역</div>
            <div className="value">서울시 관악구 신림동</div>
          </ListElement>
        </div>

        <ButtonWrapper>
          <Link href="/insurance-register/confirm">
            <a>
              <Button
                text="병원 정보 화면으로 돌아가기"
                bold
                width="100%"
                color={theme.colors.purple}
                backgroundColor={theme.colors.white}
              />
            </a>
          </Link>
        </ButtonWrapper>
      </Content>
    </Layout>
  );
};

export default Confirm;

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return { props: {} };
  }
);

const ListElement = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2.5rem;

  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: ${(props) => props.theme.lineHeights.lg};
  .key {
    color: ${(props) => props.theme.colors.purple};
    font-weight: 700;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;

  .title {
    font-size: ${(props) => props.theme.fontSizes.xxl};
    line-height: ${(props) => props.theme.lineHeights.xxl};
    margin-top: 0.5rem;
    margin-bottom: 3rem;
  }
`;

const ButtonWrapper = styled.div`
  padding: 1rem 0;
  width: 100%;
`;
