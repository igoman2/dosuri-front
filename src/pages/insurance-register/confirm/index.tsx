import "dayjs/locale/ko";

import React, { useMemo } from "react";

import Button from "@/components/Button";
import HeaderInsurance from "@/components/Layout/Header/Depth/HeaderInsurance";
import Layout from "@/components/Layout";
import dayjs from "dayjs";
import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useTheme } from "@emotion/react";
import { userInfoState } from "@/store/user";

const Confirm = () => {
  const theme = useTheme();
  const router = useRouter();
  const userInfo = useRecoilValue(userInfoState);

  const formmatedBirthday = useMemo(() => {
    if (!userInfo.birthday) {
      return;
    }

    return new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
      dayjs(userInfo.birthday ?? "").toDate()
    );
  }, [userInfo.birthday]);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Layout header={<HeaderInsurance />} footer={false}>
      <Content>
        <div className="inner">
          <div className="title">
            도수리에 가입된 정보로 실손보험 상담 신청이 완료되었습니다.
          </div>
          <ListElement>
            <div className="key">이름</div>
            <div className="value">{userInfo.nickname}</div>
          </ListElement>
          <ListElement>
            <div className="key">핸드폰 번호</div>
            <div className="value">{userInfo.phone_no}</div>
          </ListElement>
          <ListElement>
            <div className="key">생년월일</div>
            <div className="value">{formmatedBirthday}</div>
          </ListElement>
          <ListElement>
            <div className="key">성별</div>
            <div className="value">{userInfo.sex}</div>
          </ListElement>
          <ListElement>
            <div className="key">지역</div>
            <div className="value">{`${userInfo.address.large_area} ${userInfo.address.small_area}`}</div>
          </ListElement>
        </div>
      </Content>
      <SaleButtonWrapper>
        <Button
          onClick={handleBackClick}
          text="병원 정보 화면으로 돌아가기"
          bold
          width="100%"
          color={theme.colors.purple}
          backgroundColor={theme.colors.white}
        />
      </SaleButtonWrapper>
    </Layout>
  );
};

export default Confirm;

const SaleButtonWrapper = styled.div`
  position: fixed;
  bottom: 0;
  margin: 0 2rem;
  width: calc(100% - 4rem);
  max-width: 40rem;
  margin: 0 auto;
  left: 0;
  right: 0;
  padding: 1rem 0;
`;

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

  .inner {
    margin-bottom: 8.7rem;
  }
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
