import React, { FC } from "react";
import Image from "next/image";
import ReviewBannerImg from "@/public/assets/review-banner.png";
import styled from "@emotion/styled";
import Link from "next/link";

interface IReviewBannerProps {
  parentIndex: number;
  childIndex: number;
}

const ReviewBanner: FC<IReviewBannerProps> = ({ parentIndex, childIndex }) => {
  /**
   *
   * @param parentIndex childIndex가 10 늘어날때마다 1씩 증가
   * @param childIndex 무한스크롤에서 한번에 10개씩 받아오므로 1~10이 반복됨
   * @returns Boolean
   */
  const isBannerVisible = (): Boolean => {
    // 처음 5번째
    if (parentIndex === 0 && childIndex === 5) {
      return true;
    }
    // 그 후 20개마다
    // parentIndex !== 0 은 0번째에 나오지 않음을 의미
    else if (parentIndex !== 0 && parentIndex % 2 === 0 && childIndex === 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <>
      {isBannerVisible() && (
        <Link href="https://dosuri.notion.site/4e50154c10c841b5a1eb9a8aac1355aa?pvs=4">
          <a target="_blank" rel="noopener noreferrer">
            <BannerWrapper>
              <span className="image">
                <Image
                  src={ReviewBannerImg}
                  width={250}
                  height={60}
                  alt="review-banner"
                />
              </span>
            </BannerWrapper>
          </a>
        </Link>
      )}
    </>
  );
};

export default ReviewBanner;

const BannerWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.purple_light2};
  margin: 0 -2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8rem;

  & .image {
    padding: 0.7rem 0 1.3rem 0;
  }
`;
