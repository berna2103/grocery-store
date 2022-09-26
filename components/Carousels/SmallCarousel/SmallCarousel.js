import React from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";

export default function SmallCarousel({items}) {

  if (!items) {
    return <p>loading ...</p>;
  }

  return (
    <div className="container mt-5">
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
        ]}
        //   spaceBetween={120}
        //   slidesPerView={1}

        breakpoints={{
          // when window width is >= 540px
          450: {
            width: 450,
            slidesPerView: 3,
            spaceBetween: 10,
          },
          // when window width is >= 540px
          540: {
            width: 540,
            slidesPerView: 3,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 4,
            spaceBetween: 10,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        //   navigation
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
