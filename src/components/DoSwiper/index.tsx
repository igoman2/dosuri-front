import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";

interface DoSwiperProps {
  source: string[];
}

const DoSwiper: FC<DoSwiperProps> = ({ source }) => {
  return (
    <Swiper
      style={{
        width: "100%",
      }}
      modules={[Scrollbar, A11y]}
      scrollbar={{ draggable: true }}
      spaceBetween={6}
      initialSlide={0}
      slidesPerView={2}
      pagination={{
        clickable: true,
      }}
      autoplay={{ delay: 3000 }}
    >
      {source.map((src, i) => (
        <SwiperSlide key={i} style={{ width: "50%" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "12rem",
              backgroundColor: "black",
              borderRadius: "0.5rem",
            }}
          >
            <Image alt={src} src={src} layout="fill" objectFit="contain" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default DoSwiper;
