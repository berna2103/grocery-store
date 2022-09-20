import styles from "./offers.module.css";
import { getContentfulItems } from "../../contentful/Contentful";
import Carousel from "../../components/Carousels/Carousel";
import CarouselItem from "../../components/Carousels/TopDealsCarousel/CarouselItem";
import SmallCarousel from "../../components/Carousels/SmallCarousel/SmallCarousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loaading";

export default function Offers(props) {
  const list = props.offers;
  const offers = [];
  const products = [];

  if (!props) {
    return <Loading />;
  }
  return (
    <div className={`${styles.offers} container`}>
      <h1 className="display-6 mb-5">Top deals this week!</h1>
      <p className="lead text-muted"></p>
      {list.map((item, index) => {
        if (index % 4 === 0) {
          offers.push(<CarouselItem key={item.sys.id} item={item} />);
        } else {
          products.push(<ProductCard key={item.sys.id} product={item} />);
        }
      })}
      <Carousel items={offers} />
      <h1 className={`display-6 mt-5`}>More great offers!</h1>
      <SmallCarousel items={products} />
    </div>
  );
}

export async function getStaticProps() {
  const entries = await getContentfulItems("product");

  const offers = entries.filter((obj) => {
    return obj.fields.isOnSale === true;
  });

  return {
    props: { offers },
  };
}
