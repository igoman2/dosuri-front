import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import SampleImage from "@/public/assets/sample.png";
import Image from "next/image";

const DoSwiper = () => {
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
      <SwiperSlide>
        <Image src={SampleImage} alt="hospitalImage" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={SampleImage} alt="hospitalImage" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={SampleImage} alt="hospitalImage" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={SampleImage} alt="hospitalImage" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={SampleImage} alt="hospitalImage" />
      </SwiperSlide>
      <SwiperSlide>
        <Image src={SampleImage} alt="hospitalImage" />
      </SwiperSlide>
    </Swiper>
  );
};

export default DoSwiper;
