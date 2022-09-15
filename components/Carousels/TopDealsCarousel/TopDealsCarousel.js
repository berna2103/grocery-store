// import data from '../../../../Dummy-Data.js'
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
import CarouselItem from "./CarouselItem";

export default function TopDealsCarousel(props) {
  const items = props.data;

  if (!items) {
    return <p> loading ... </p>;
  }

  return (
    <div className="container">
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
        spaceBetween={1}
        effect="fade"
        slidesPerView={1}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        // navigation
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {items.map((item) => (
          <SwiperSlide>
            <CarouselItem data={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
