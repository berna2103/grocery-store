// import data from '../../../../Dummy-Data.js'
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  EffectFade,
  Autoplay,
  Zoom,
} from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/zoom";

export default function Carousel({ items }) {

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
          Zoom,
        ]}
        spaceBetween={1}
        effect="fade"
        slidesPerView={1}
        zoom={{ maxRatio: 1.2, minRation: 1 }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        // navigation
        pagination={{ clickable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
      >
        {items.map((item) => (
          <SwiperSlide>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
