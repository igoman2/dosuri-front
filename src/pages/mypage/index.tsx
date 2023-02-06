import React, { useMemo } from "react";

import ArrowRight from "@/public/assets/arrow-right.png";
import Divider from "@/components/UI/Divider";
import Header from "@/components/Layout/Header";
import Icon from "@/util/Icon";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import ListTab from "@/components/UI/ListTab";
import { NextSeo } from "next-seo";
import styled from "@emotion/styled";
import { useGetMyCurrentPoint } from "@/hooks/service/useGetMyCurrentPoint";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { useUpdateReadingFlag } from "@/hooks/service/useUpdateReadingFlag";
import { userInfoState } from "@/store/user";

type TabList = {
  text: string;
  subtext: string;
  link: string;
  hasNoti: boolean;
  isExternalURL: boolean;
};

const Mypage = () => {
  const userInfo = useRecoilValue(userInfoState);
  const router = useRouter();
  const { mutate } = useUpdateReadingFlag();
  const tabList: TabList[] = useMemo(() => {
    return [
      {
        text: "내 치료후기",
        subtext: "",
        link: "mypage/review",
        hasNoti: false,
        isExternalURL: false,
      },
      {
        text: "내 포인트",
        subtext: "",
        link: "mypage/point",
        hasNoti: false,
        isExternalURL: false,
      },
      {
        text: "공지사항",
        subtext: "",
        link: "https://jade-grill-d5b.notion.site/5f996c9048314c699fac080cd2f22509",
        hasNoti: userInfo.unread_notice,
        isExternalURL: true,
      },
      {
        text: "도수리 팀에게 의견 보내기",
        subtext: "",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSdUtYb-pT6qp3W5WOjD78Nzu6ylKwblgxcV3pkh4e-bzgxYig/viewform",
        hasNoti: false,
        isExternalURL: true,
      },
      {
        text: "병원 입점 문의",
        subtext: "",
        link: "https://docs.google.com/forms/d/e/1FAIpQLSfMUUNNMdUKnlVURL85SZiC3FDQssPEcZtbqtcYh7Zl_nSGHQ/viewform",
        hasNoti: false,
        isExternalURL: true,
      },
    ];
  }, [userInfo.unread_notice]);

  const { currentPoint } = useGetMyCurrentPoint();

  tabList[1].subtext = currentPoint?.total_point.toLocaleString() + "P" ?? "P";

  const handleListClick = (tab: TabList) => {
    const isExternalURL = tab.isExternalURL;

    if (tab.text === "공지사항") {
      mutate();
    }

    if (isExternalURL) {
      window.open(
        tab.link,
        isExternalURL ? "_blank" : "",
        isExternalURL ? "noopener,noreferrer" : ""
      );
    } else {
      router.push(tab.link);
    }
  };

  return (
    <Layout
      header={
        <Header
          left={true}
          right={
            <HeaderRightSection>
              <Link href="/mypage/notification">
                <a>
                  <Icon name="notification_off" width="24" height="24" />
                </a>
              </Link>

              <Link href="/mypage/setting">
                <a>
                  <Icon name="setting" width="24" height="24" />
                </a>
              </Link>
            </HeaderRightSection>
          }
        />
      }
    >
      <NextSeo title="마이페이지 | 도수리-도수치료 리얼후기" />

      <ProfileSectionWrapper>
        <div className="nickname">{userInfo.nickname}</div>
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
          <div onClick={() => handleListClick(tab)} key={`${tab.text}-${i}`}>
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
          </div>
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

const HeaderRightSection = styled.div`
  display: flex;
  gap: 1rem;
`;
