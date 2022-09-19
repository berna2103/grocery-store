import React from "react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import ProductCard from "../../ProductCard/ProductCard.js";

export default function SmallCarousel({items}) {

  if (!items) {
    return <p>loading ...</p>;
  }

  return (
    <div className="container">
      <p className="display-6 text-danger mt-5">Related Products</p>
      <p className="lead text-muted"></p>
      <Swiper
        // install Swiper modules
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          EffectFade,
          Autoplay,
        ]}
        //   spaceBetween={120}
        //   slidesPerView={1}

        breakpoints={{
          // when window width is >= 540px
          450: {
            width: 450,
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when window width is >= 540px
          540: {
            width: 540,
            slidesPerView: 2,
            spaceBetween: 30,
          },
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 3,
            spaceBetween: 50,
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
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log("slide change")}
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
