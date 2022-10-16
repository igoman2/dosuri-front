import Layout from "@/components/Layout";
import Header from "@/components/Layout/Header";
import ListTab from "@/components/UI/ListTab";
import styled from "@emotion/styled";
import Image from "next/image";
import ArrowRight from "@/public/assets/arrow-right-bold.png";
import React from "react";
import Divider from "@/components/UI/Divider";
import Link from "next/link";

const tabList = [
  { text: "내 치료후기", subtext: "", link: "mypage/review", hasNoti: false },
  {
    text: "내 포인트",
    subtext: "2,000P",
    link: "mypage/point",
    hasNoti: false,
  },
  { text: "공지사항", subtext: "", link: "mypage/notification", hasNoti: true },
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
            <a className="text">내 정보 수정</a>
          </Link>
          <span className="image-wrapper">
            <Image src={ArrowRight} width={14} height={14} alt="arrow-right" />
          </span>
        </div>
      </ProfileSectionWrapper>

      <Divider height={8} />

      <div className="list-section">
        {tabList.map((tab, i) => (
          <ListTab
            text={tab.text}
            subText={tab.subtext}
            hasNoti={tab.hasNoti}
            link={tab.link}
            key={i}
            isLast={tabList.length - 1 === i ? true : false}
          />
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
      font-size: ${(props) => props.theme.fontSizes.md};
      line-height: ${(props) => props.theme.lineHeights.md};
      padding-top: 0.2rem;
    }
  }

  .image-wrapper {
    height: 1.4rem;
  }

  .list-section {
    color: ${(props) => props.theme.colors.red} !important;
  }
`;
