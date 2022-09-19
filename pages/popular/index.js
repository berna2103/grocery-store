import React from "react";
import Carousel from "../../components/Carousels/Carousel";
import SmallCarousel from "../../components/Carousels/SmallCarousel/SmallCarousel";
import CarouselItem from "../../components/Carousels/TopDealsCarousel/CarouselItem";
import Loaading from "../../components/Loading/Loaading";
import ProductCard from "../../components/ProductCard/ProductCard";
import { getContentfulItems } from "../../contentful/Contentful";

export default function Popular(props) {
  const popularProducts = props.popularProducts;
  const banner = [];
  const popular = [];

  if (!popularProducts) {
    return <Loaading />;
  }
  return (
    <div className={`container`}>
      <div className={`container mt-4`}>
        {popularProducts.map((item, index) => {
          if (index % 4 === 0) {
            banner.push(<CarouselItem key={item.sys.id} item={item} />);
          } else {
            popular.push(<ProductCard key={item.sys.id} product={item} />);
          }
        })}
        <Carousel items={banner} />
        <SmallCarousel items={popular} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const entries = await getContentfulItems("product");

  const popularProducts = entries.filter((obj) => {
    return obj.fields.isPopular === true;
  });

  return {
    props: { popularProducts: popularProducts },
  };
}
