import ArrowRight from "@/public/assets/arrow-right.png";
import Divider from "@/components/Divider/Divider";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import ListTab from "@/components/Tab/ListTab";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import ToggleBar from "@/components/Toggle/ToggleBar";
import { logout } from "@/pages/withauth";
import { settings } from "@/mock/setting";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { changePersonalInfoConsent, getUser } from "@/service/apis/user";
import { userInfoState } from "@/store/user";

const packageJson = require("/package.json");

const Setting = () => {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);
  const [consents, setConsents] = useState([
    {
      title: "광고 알림",
      isActive: userInfo.setting.agree_marketing_push,
    },
    {
      title: "일반 알림",
      isActive: userInfo.setting.agree_general_push,
    },
    {
      title: "SMS 마케팅 동의",
      isActive: userInfo.setting.agree_marketing_sms,
    },
    {
      title: "이메일 마케팅 동의",
      isActive: userInfo.setting.agree_marketing_email,
    },
  ]);

  const onToggleButtonClick = async (consentIdx: number) => {
    // setConsents((prev) => {
    //   prev[consentIdx].isActive = !prev[consentIdx].isActive;
    //   return prev;
    // });

    const personalInfoConsent = {
      agree_marketing_personal_info:
        userInfo.setting.agree_marketing_personal_info,
      agree_general_push: userInfo.setting.agree_general_push,
      agree_marketing_push: userInfo.setting.agree_marketing_push,
      agree_marketing_email: userInfo.setting.agree_marketing_email,
      agree_marketing_sms: userInfo.setting.agree_marketing_sms,
      uuid: userInfo.uuid,
    };

    if (consentIdx === 0) {
      personalInfoConsent["agree_marketing_push"] =
        !personalInfoConsent["agree_marketing_push"];
    } else if (consentIdx === 1) {
      personalInfoConsent["agree_general_push"] =
        !personalInfoConsent["agree_general_push"];
    } else if (consentIdx === 2) {
      personalInfoConsent["agree_marketing_sms"] =
        !personalInfoConsent["agree_marketing_sms"];
    } else if (consentIdx === 3) {
      personalInfoConsent["agree_marketing_email"] =
        !personalInfoConsent["agree_marketing_email"];
    }

    try {
      const response = await changePersonalInfoConsent(personalInfoConsent);
      const resp = await getUser();
      const user = resp!;
      setUserInfo((prev) => {
        return {
          ...prev,
          setting: user.setting,
        };
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <NextSeo title="마이페이지 | 도수리-도수치료 리얼후기" />

      <SettingWrapper>
        <div className="sub-title">설정</div>

        <div className="setting-layout">
          <ul className="list-section">
            <Divider height={1} />

            {consents.map((consent, idx) => {
              return (
                <ListTab
                  text={consent.title}
                  subText=""
                  key={`${consent.title}-${idx}`}
                  isLast={false}
                  right={
                    <ToggleBar
                      isActive={consent.isActive}
                      onClick={() => {
                        onToggleButtonClick(idx);
                      }}
                    />
                  }
                />
              );
            })}
          </ul>

          <ul className="list-section">
            <ListTab
              text="현재 버전"
              subText=""
              key="현재 버전"
              isLast={false}
              right={<Version> v {packageJson.version}</Version>}
            />
            <Link href="https://dosuri.notion.site/2022-10-d9fbe2e7bb934b759df98242274af094?pvs=4">
              <a target="_blank" rel="noopener noreferrer">
                <ListTab
                  text="이용약관"
                  key="이용약관"
                  subText=""
                  isLast={false}
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
                />
              </a>
            </Link>

            <Link href="https://dosuri.notion.site/71957af0778a4f59afb98fd2fbdd6639?pvs=4">
              <a target="_blank" rel="noopener noreferrer">
                <ListTab
                  text="개인정보 처리방침"
                  key="개인정보 처리방침"
                  subText=""
                  isLast={false}
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
                />
              </a>
            </Link>

            <ListTab
              onClick={() => logout()}
              text="로그아웃"
              key="로그아웃"
              subText=""
              isLast={false}
              color="red_light"
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
            />

            <Link href="/mypage/resign">
              <a>
                <ListTab
                  text="회원 탈퇴"
                  key="회원 탈퇴"
                  subText=""
                  isLast={true}
                  color="grey"
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
                />
              </a>
            </Link>
          </ul>
        </div>
      </SettingWrapper>
    </Layout>
  );
};

export default Setting;

const SettingWrapper = styled.div`
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
    margin-bottom: 2.5rem;
  }

  .list-section {
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;

    li {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;

      div {
        display: flex;
        gap: 1rem;
      }
    }
  }
`;

const Version = styled.div`
  font-size: ${(props) => props.theme.fontSizes.lg};
  line-height: ${(props) => props.theme.lineHeights.lg};
  color: ${(props) => props.theme.colors.grey};
  font-weight: 400;
`;
