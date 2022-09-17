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
  
  export default function CarouselTest(props) {
    
    const items = props.props
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

        >
          {items.map((item) => (
            <SwiperSlide>
             {item}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  }
  