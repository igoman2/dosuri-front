import Image from "next/image";
import React from "react";
import EventPageImage from "@/public/assets/event-page-image.png";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import { useTheme } from "@emotion/react";
import Button from "@/components/Button";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import { reservationModalState } from "@/components/domain/Hospital/store";
import { useSetRecoilState } from "recoil";
import { isEmpty } from "ramda";
import { NextSeo } from "next-seo";

const Event = () => {
  const theme = useTheme();
  const router = useRouter();
  const setReservationModal = useSetRecoilState(reservationModalState);

  const hasQuery = isEmpty(router.query);

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <div
        css={{
          marginBottom: "6rem",
        }}
      >
        <NextSeo
          title={`도수치료 예약 이벤트`}
          description="인증 후기 남기면 아메리카노 100% 제공"
          canonical={`https://www.dosuri.site/event`}
          openGraph={{
            url: `https://www.dosuri.site/event`,
          }}
        />
        <Image src={EventPageImage} objectFit="contain" alt="event" />
        {!hasQuery && (
          <SaleButtonWrapper>
            <Button
              text="지금 예약하러 가기"
              width="100%"
              height="5.2rem"
              borderRadius="0.3rem"
              backgroundColor={theme.colors.purple_light}
              bold
              onClick={() => {
                setReservationModal(true);
                router.back();
              }}
            />
          </SaleButtonWrapper>
        )}
      </div>
    </Layout>
  );
};

export default Event;

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
  background-color: ${(props) => props.theme.colors.white};
  z-index: 50;
`;
