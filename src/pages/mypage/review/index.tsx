import ReviewCard from "@/components/Card/ReviewCard";
import Layout from "@/components/Layout";
import HeaderDepth from "@/components/Layout/Header/HeaderDepth";
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { reviews } from "@/mock/reviews";
import Button from "@/components/Button";
import Link from "next/link";

const DIRECTION = {
  Up: "UP",
  Down: "Down",
} as const;
type DIRECTION = typeof DIRECTION[keyof typeof DIRECTION]; // 'UP' | DOWN'

const Review = () => {
  const [scrollDir, setScrollDir] = useState<DIRECTION>();

  useEffect(() => {
    const threshold = 0;
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      if (Math.abs(scrollY - lastScrollY) < threshold) {
        ticking = false;
        return;
      }
      setScrollDir(scrollY > lastScrollY ? DIRECTION.Down : DIRECTION.Up);
      lastScrollY = scrollY > 0 ? scrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDir);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollDir]);

  return (
    <Layout header={<HeaderDepth />} footer={false}>
      <>
        <ReviewWrapper>
          <div className="sub-title">내 후기 총 2개</div>

          {reviews.map((review, i) => (
            <Link href={`review/${review.id}`} key={i}>
              <a>
                <ReviewCard review={review} />
              </a>
            </Link>
          ))}
        </ReviewWrapper>

        <Float direction={scrollDir}>
          <Button iconName="pen" text="후기 또는 질문 쓰기" />
        </Float>
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

interface FloatProps {
  direction: DIRECTION | undefined;
}

const Float = styled.div<FloatProps>`
  display: flex;
  justify-content: center;
  position: fixed;
  bottom: 1.5rem;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s linear;
  transform: ${(props) =>
    props.direction === DIRECTION.Up ? "" : "translateY(10rem)"};
`;
