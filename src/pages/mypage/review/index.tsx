import { EmptyText } from "@/components/UI/emotion/EmptyText";
import Float from "@/components/UI/Float";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import { IHospitalReviewsResult } from "@/service/types";
import Icon from "@/util/Icon";
import Layout from "@/components/Layout";
import Link from "next/link";
import PostCard from "@/components/Card/PostCard";
import React from "react";
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

  const user = useRecoilValue(userInfoState);
  const { communityList } = useGetCommunity({
    user: user.uuid,
  });

  const renderPostBottom = (review: IHospitalReviewsResult) => {
    return (
      <PostBottom>
        <div className="post-bottom">
          <div className="heart">
            <Icon name="heart" width="17" height="17" />
            <span>{review.up_count}</span>
          </div>
          <div className="comment">
            <Icon name="comment" width="17" height="17" />
            <span>{review.article_attachment_assoc.length}</span>
          </div>
        </div>
      </PostBottom>
    );
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
                    <PostCard review={post} bottom={renderPostBottom(post)} />
                  </a>
                </Link>
              ))}
            </>
          )}
        </ReviewWrapper>

        <Float scrollDir={scrollDir} distance="1.5rem" />
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

const PostBottom = styled.div`
  .post-bottom {
    display: flex;
    gap: 1rem;
    font-size: ${(props) => props.theme.fontSizes.sm};
    line-height: ${(props) => props.theme.lineHeights.sm};
    .heart {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
    .comment {
      display: flex;
      gap: 0.3rem;
      align-items: center;
    }
  }
`;
