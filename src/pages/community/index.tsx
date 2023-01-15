import React, { useState } from "react";
import { modalContentState, modalState } from "@/components/Modal/store";

import Button from "@/components/Button";
import Float from "@/components/UI/Float";
import Header from "@/components/Layout/Header";
import { IHospitalReviewsResult } from "@/service/types";
import Icon from "@/util/Icon";
import Image from "next/image";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostBottom from "@/components/UI/emotion/PostBottom";
import PostCard from "@/components/Card/PostCard";
import WriteQuesiton from "@/components/Write/Question";
import WriteReview from "@/components/Write/Review";
import note from "@/public/assets/note.png";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";
import { useGetCommunity } from "@/hooks/service/useGetCommunity";
import { useSetRecoilState } from "recoil";
import { useTheme } from "@emotion/react";

const Tablist: Tab[] = [
  {
    title: "전체보기",
    value: "all",
  },
  {
    title: "치료후기만 보기",
    value: "review",
  },
  {
    title: "질문/상담만 보기",
    value: "question",
  },
];

type Tab = {
  title: "전체보기" | "치료후기만 보기" | "질문/상담만 보기";
  value: "all" | "review" | "question";
};

const Community = () => {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState<Tab>(Tablist[0]);
  const [scrollDir] = useDirection();
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState("");
  const setModalIsActive = useSetRecoilState(modalState);
  const setModalContent = useSetRecoilState(modalContentState);

  const onWriteHandler = () => {
    setModalType("question");
    setIsActive(true);
  };

  const onSwapModalType = () => {
    setIsActive(false);
    setModalType("review");
    setIsActive(true);
  };

  const changeActiveHandler = () => {
    setModalContent({
      title: "후기 작성을 취소하시겠어요?",
      content: `
      작성을 취소할 경우 지금까지 입력한 내용이 모두 사라집니다.`,
      actionLeft: {
        text: "작성 취소",
        action: () => {
          setIsActive(false);
          setModalIsActive({ isActive: false });
        },
      },
      actionRight: {
        text: "계속 작성",
        action: () => {
          setModalIsActive({ isActive: false });
        },
      },
    });
    setModalIsActive((prev) => ({
      action: () => {
        setModalIsActive((prev) => ({ ...prev, isActive: false }));
      },
      isActive: true,
    }));
  };

  const onTabClick = (tab: Tab) => {
    setCurrentTab(tab);
  };

  const { communityList } = useGetCommunity({
    article_type: currentTab.value,
  });

  const renderPostBottom = (review: IHospitalReviewsResult) => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="20" height="20" />
            <span>{review.up_count}</span>
          </div>

          <div className="comment">
            <Icon name="comment" width="20" height="20" />
            <span>{review.article_attachment_assoc.length}</span>
          </div>
        </div>
      </PostBottom>
    );
  };

  return (
    <Layout
      header={
        <Header
          left={true}
          center={true}
          right={
            <Image
              src={note}
              alt="register"
              width={28}
              height={28}
              onClick={onWriteHandler}
            />
          }
        />
      }
    >
      <>
        <div className="tab">
          <ButtonWrapper>
            {Tablist.map((tab, i) => (
              <Button
                key={i}
                text={tab.title}
                backgroundColor={theme.colors.white}
                color={
                  tab.title === currentTab.title
                    ? theme.colors.purple
                    : theme.colors.grey
                }
                border={
                  tab.title === currentTab.title
                    ? `0.1rem solid ${theme.colors.purple}`
                    : `0.1rem solid ${theme.colors.grey}`
                }
                dense
                onClick={() => onTabClick(tab)}
              />
            ))}
          </ButtonWrapper>
        </div>

        {communityList.results.map((review, i) => (
          <Link href={`community/${review.uuid}`} key={i}>
            <a>
              <PostCard review={review} bottom={renderPostBottom(review)} />
            </a>
          </Link>
        ))}

        <Float scrollDir={scrollDir} distance="8.5rem" />

        {modalType === "question" ? (
          <WriteQuesiton
            onSwap={onSwapModalType}
            isActive={isActive}
            onChangeActive={changeActiveHandler}
          />
        ) : (
          <WriteReview
            isActive={isActive}
            onChangeActive={changeActiveHandler}
          />
        )}
      </>
    </Layout>
  );
};

export default Community;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 0.5rem 0 1.5rem 0;
`;
