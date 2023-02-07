import "swiper/css";
import "swiper/css/pagination";

import { A11y, Scrollbar } from "swiper";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";
import styled from "@emotion/styled";

interface DoSwiperProps {
  source: string[];
  slidesPerView?: number;
  spaceBetween?: number;
  hasBackground?: boolean;
}

const DoSwiper: FC<DoSwiperProps> = ({
  source,
  slidesPerView,
  spaceBetween,
  hasBackground = false,
}) => {
  const style = hasBackground
    ? {
        backgroundColor: "black",
        borderRadius: "0.5rem",
      }
    : undefined;
  return (
    <Swiper
      modules={[Scrollbar, A11y]}
      scrollbar={{ draggable: true }}
      spaceBetween={spaceBetween}
      initialSlide={0}
      slidesPerView={slidesPerView}
      pagination={{
        clickable: true,
      }}
      autoplay={{ delay: 3000 }}
    >
      {source.map((src, i) => (
        <SwiperSlide key={i}>
          <Image
            style={style}
            alt={src}
            src={src}
            layout="fill"
            objectFit="contain"
            priority
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DoSwiper;
