import "swiper/css";
import "swiper/css/pagination";

import { A11y, Scrollbar } from "swiper";
import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import Image from "next/image";

interface DoSwiperProps {
  source: string[];
  slidesPerView?: number;
  spaceBetween?: number;
}

const DoSwiper: FC<DoSwiperProps> = ({
  source,
  slidesPerView,
  spaceBetween,
}) => {
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
