import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import ListTab from "@/components/UI/ListTab";
import styled from "@emotion/styled";
import Image from "next/image";
import ArrowRight from "@/public/assets/arrow-right.png";
import React from "react";
import Divider from "@/components/UI/Divider";
import Link from "next/link";
import { NextPageContext } from "next";
import { withAuthentication } from "../withAuthenticate";

const tabList = [
  { text: "내 치료후기", subtext: "", link: "mypage/review", hasNoti: false },
  {
    text: "내 포인트",
    subtext: "2,000P",
    link: "mypage/point",
    hasNoti: false,
  },
  { text: "공지사항", subtext: "", link: "mypage/notification", hasNoti: true },
  { text: "설정", subtext: "", link: "mypage/setting", hasNoti: false },
  {
    text: "도수리 팀에게 의견 보내기",
    subtext: "",
    link: "mypage/claim",
    hasNoti: false,
  },
  {
    text: "병원 입점 문의",
    subtext: "",
    link: "mypage/inquiry",
    hasNoti: false,
  },
];

const Mypage = () => {
  return (
    <Layout header={<Header left={true} center={true} right={true} />}>
      <ProfileSectionWrapper>
        <div className="nickname">닉네임최대열글자이하</div>
        <div className="edit-profile">
          <Link href="mypage/edit">
            <a className="text">
              <span>내 정보 수정</span>
              <span className="image-wrapper">
                <Image
                  src={ArrowRight}
                  width={14}
                  height={14}
                  alt="arrow-right"
                />
              </span>
            </a>
          </Link>
        </div>
      </ProfileSectionWrapper>

      <Divider height={8} />

      <div className="list-section">
        {tabList.map((tab, i) => (
          <Link href={tab.link} key={`${tab.text}-${i}`}>
            <a>
              <ListTab
                text={tab.text}
                subText={tab.subtext}
                hasNoti={tab.hasNoti}
                color={tab.text === "병원 입점 문의" ? "red_light" : "black"}
                key={i}
                right={
                  <div>
                    <Image
                      src={ArrowRight}
                      width={25}
                      height={25}
                      alt="arrow-right"
                    />
                  </div>
                }
                isLast={tabList.length - 1 === i ? true : false}
              />
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Mypage;

const ProfileSectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2.5rem 0;

  .nickname {
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
  }

  .edit-profile {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    & .text {
      display: flex;
      align-items: center;
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};

      &span {
        padding-top: 0.2rem;
      }
    }
  }

  .image-wrapper {
    height: 1.4rem;
  }

  .list-section {
    color: ${(props) => props.theme.colors.red} !important;
  }
`;

export const getServerSideProps = withAuthentication(
  async (context: NextPageContext) => {
    return { props: {} };
  }
);
