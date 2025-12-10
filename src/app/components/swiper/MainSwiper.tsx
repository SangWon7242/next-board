"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import Image from "next/image";
import { MAIN_IMAGES } from "@/app/constants/constants";
import { Autoplay } from "swiper/modules";

export default function MainSwiper() {
  return (
    <Swiper
      modules={[Autoplay]}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: 3000 }}
      spaceBetween={0}
      slidesPerView={1}
    >
      {MAIN_IMAGES.map((item) => (
        <SwiperSlide>
          <div
            key={item.id}
            className="h-[400px] flex items-center justify-center"
          >
            <Image
              src={item.image}
              alt="swiper 메인 이미지"
              className="w-full h-full"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
