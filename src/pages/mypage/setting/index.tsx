import ArrowRight from "@/public/assets/arrow-right.png";
import Divider from "@/components/UI/Divider";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import ListTab from "@/components/UI/ListTab";
import React from "react";
import ToggleBar from "@/components/UI/ToggleBar";
import { logout } from "@/pages/withauth";
import { settings } from "@/mock/setting";
import styled from "@emotion/styled";

const packageJson = require("/package.json");

const Setting = () => {
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <SettingWrapper>
        <div className="sub-title">설정</div>

        <div className="setting-layout">
          <ul className="list-section">
            <Divider height={1} />

            {settings.map((setting, i) => {
              return (
                <ListTab
                  text={setting.title}
                  subText=""
                  key={`${setting.title}-${i}`}
                  isLast={false}
                  right={<ToggleBar isActive={setting.isActive} />}
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
            <Link href="https://jade-grill-d5b.notion.site/2022-10-d9fbe2e7bb934b759df98242274af094">
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

            <Link href="https://jade-grill-d5b.notion.site/2022-10-3b9b6c4354e1413eb18af3987cc58d10">
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
