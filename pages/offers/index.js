import styles from "./offers.module.css";
import { getContentfulItems } from "../../contentful/Contentful";
import Carousel from "../../components/Carousels/Carousel";
import CarouselItem from "../../components/Carousels/TopDealsCarousel/CarouselItem"
import SmallCarousel from "../../components/Carousels/SmallCarousel/SmallCarousel";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loading from "../../components/Loading/Loaading";

export default function Offers(props) {
  const list = props.offers;
  const offers = [];
  const products = []
  const data = props.rot

  if(!props){
    return <Loading />
  }
  return (
    <div className={`${styles.offers} container`}>
      <p className="display-4 text-danger">Top deals this week!</p>
      <p className="lead text-muted"></p>
      {list.map((item) => {
        offers.push(<CarouselItem key={item.sys.id} item={item} />);
        products.push(<ProductCard key={item.sys.id} product={item} />)
    
      })}
      <Carousel items={offers} />
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
