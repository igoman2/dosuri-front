import Avatar from "@/components/UI/Avatar";
import Divider from "@/components/UI/Divider";
import { EmptyText } from "@/components/UI/emotion/EmptyText";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import { NextSeo } from "next-seo";
import React from "react";
import { notifications } from "@/mock/notifications";
import styled from "@emotion/styled";

const Notification = () => {
  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <NextSeo title="마이페이지 | 도수리-도수치료 리얼후기" />

      <NotificationWrapper>
        <div className="sub-title">알림 내역</div>
        <EmptyText>알림이 없습니다.</EmptyText>

        {/* <ul className="list-section">
          <Divider height={1} />

          {notifications.map((notification) => {
            return (
              <>
                <li>
                  <div className="avatar-layout">
                    <Avatar
                      src="https://dosuri-images.s3.ap-northeast-2.amazonaws.com/logo3.png"
                      height={49}
                      width={49}
                    />
                    <div className="bubble"></div>
                  </div>

                  <div className="notification">
                    <div className="head">
                      <div className="title">{notification.title}</div>
                      <div className="date">{notification.date}</div>
                    </div>
                    <div>{notification.description}</div>
                  </div>
                </li>
                <Divider height={1} />
              </>
            );
          })}
        </ul> */}
      </NotificationWrapper>
    </Layout>
  );
};

export default Notification;

const NotificationWrapper = styled.div`
  .sub-title {
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .list-section {
    font-size: ${(props) => props.theme.fontSizes.lg};
    line-height: ${(props) => props.theme.lineHeights.lg};
    margin-top: 1.5rem;

    li {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      margin: 1rem 0;

      .notification {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .head {
        display: flex;
        justify-content: space-between;

        .title {
          font-size: ${(props) => props.theme.fontSizes.lg};
          line-height: ${(props) => props.theme.lineHeights.lg};
          font-weight: 700;
        }

        .date {
          color: ${(props) => props.theme.colors.grey};
          font-size: ${(props) => props.theme.fontSizes.sm};
          line-height: ${(props) => props.theme.lineHeights.sm};
        }
      }
    }
  }

  .avatar-layout {
    position: relative;
  }

  .bubble {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-color: red;
    width: 0.5rem;
    height: 0.5rem;
  }
`;
