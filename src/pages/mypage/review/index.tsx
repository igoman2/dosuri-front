import React, { useState } from "react";

import { EmptyText } from "@/components/UI/emotion/EmptyText";
import Float from "@/components/UI/Float";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import Layout from "@/components/Layout";
import Link from "next/link";
import ModalFactory from "@/components/Write/Review/ModalFactory";
import PostBottom from "@/components/Card/PostCard/PostBottom";
import PostCard from "@/components/Card/PostCard";
import styled from "@emotion/styled";
import useDirection from "@/hooks/useDirection";
import { useGetCommunity } from "@/hooks/service/useGetCommunity";
import { useRecoilValue } from "recoil";
import { userInfoState } from "@/store/user";

export const DIRECTION = {
  Up: "UP",
  Down: "Down",
} as const;
export type DIRECTION = typeof DIRECTION[keyof typeof DIRECTION]; // 'UP' | DOWN'

const Review = () => {
  const [scrollDir] = useDirection();
  const [isActive, setIsActive] = useState(false);
  const [modalType, setModalType] = useState("");
  const user = useRecoilValue(userInfoState);

  const { communityList } = useGetCommunity({
    user: user.uuid,
  });

  const handleActive = (val: boolean) => {
    setIsActive(val);
  };

  const handleModalType = (val: string) => {
    setModalType(val);
  };

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <>
        <ReviewWrapper>
          <div className="sub-title">내 후기 총 {communityList.count}개</div>
          {communityList.count === 0 ? (
            <EmptyText>등록된 후기가 없습니다.</EmptyText>
          ) : (
            <>
              {communityList.results.map((post) => (
                <Link href={`review/${post.uuid}`} key={post.uuid}>
                  <a>
                    <PostCard
                      review={post}
                      bottom={<PostBottom review={post} type="list" />}
                    />
                  </a>
                </Link>
              ))}
            </>
          )}
        </ReviewWrapper>

        <Float
          scrollDir={scrollDir}
          distance="1.5rem"
          onClick={() => {
            setModalType("review");
            setIsActive(true);
          }}
        />
        {isActive && (
          <ModalFactory
            isActive={isActive}
            setIsActive={handleActive}
            modalType={modalType}
            setModalType={handleModalType}
          />
        )}
      </>
    </Layout>
  );
};

export default Review;

const ReviewWrapper = styled.div`
  .sub-title {
    color: ${(props) => props.theme.colors.purple};
    font-size: ${(props) => props.theme.fontSizes.xl};
    line-height: ${(props) => props.theme.lineHeights.xl};
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
`;
