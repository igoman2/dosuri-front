import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const DoSwiper = () => {
  return (
    <Swiper
      style={{
        width: "335px",
        height: "170px",
        backgroundColor: "#FFF5F1",
        borderRadius: "12px",
      }}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={8}
      initialSlide={1}
      centeredSlides={true}
      pagination={{
        clickable: true,
      }}
      autoplay={{ delay: 3000 }}
    >
      <SwiperSlide>슬라이더1</SwiperSlide>
      <SwiperSlide>슬라이더2</SwiperSlide>
      <SwiperSlide>슬라이더3</SwiperSlide>
    </Swiper>
  );
};

export default DoSwiper;
