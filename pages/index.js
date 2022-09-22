import Head from "next/head";
import { getContentfulItems } from "../contentful/Contentful";
import Carousel from "../components/Carousels/Carousel";
import SpecialEvents from "../components/SpecialEvents/SpecialEvents";
import Dropdown from "../components/Dropdown/Dropdown";
import CarouselItem from "../components/Carousels/TopDealsCarousel/CarouselItem";
import ProductCard from "../components/ProductCard/ProductCard";
import SmallCarousel from "../components/Carousels/SmallCarousel/SmallCarousel";
import Card from "../components/Card/Card";
import Loaading from "../components/Loading/Loaading";
import Link from "next/link";

export default function Home(props) {
  const locations = props.locations;
  const specialEvents = props.specialEvents;
  const products = props.products;
  const diets = props.diet;

  const deals = [];
  const moreDeals = [];
  const event = [];

  if (!props) {
    return <Loaading />;
  }

  // const selectStore = () => {};

  return (
    <div className={`container`}>
      <Head>
        <title>Pete's Fresh Market</title>
        <meta name="description" content="Most affordable groceries in town." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`container text-center mb-3`}>
        <Dropdown list={locations} />
      </div>

      {specialEvents.map((item) => {
        event.push(<SpecialEvents key={item.sys.id} item={item} />);
      })}

      <div>
        <Carousel items={event} />
      </div>

      {!diets ? (
        <p></p>
      ) : (
        <div className={`container`}>
          <div className={`row mt-5`}>
            {diets.map((diet) => (
              <div className={`col-lg-4 col-md-4 col-sm-6`}>
                <Card
                  key={diet.sys.id}
                  data={diet}
                  id={diet.sys.id}
                  title={diet.fields.title}
                  buttonLabel={diet.fields.buttonLabel}
                  description={diet.fields.description}
                  link={`/specialty-diets/${diet.fields.title}/${diet.sys.id}`}
                  imageUrl={diet.fields.imageUrl.fields.file.url}
                />
              </div>
            ))}
          </div>
          <Link href="/specialty-diets">
            <a className={`text-danger ms-2`}>Explore all diets {' > '}</a>
          </Link>
        </div>
      )}

      <div className={`container`}>
        <h1 className={`display-6 mt-5`}>Great Deals!</h1>

        {products.map((item, index) => {
          if (index % 4 === 0) {
            deals.push(<CarouselItem key={item.sys.id} item={item} />);
          } else {
            moreDeals.push(<ProductCard key={item.sys.id} product={item} />);
          }
        })}

        <Carousel items={deals} />

        <h1 className={`display-6 mt-5`}>Even more deals!</h1>
        <SmallCarousel items={moreDeals} />
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const diet = await getContentfulItems("diet");
  const entries = await getContentfulItems("corporation");
  const specialEvents = await getContentfulItems("specialEvents");
  const deals = await getContentfulItems("product");

  const products = deals.filter((obj) => {
    return obj.fields.isOnSale === true;
  });

  const locations = entries.map((p) => {
    return p.fields;
  });

  const diets = diet.slice(0, 3);

  return {
    props: {
      diet: diets,
      locations: locations,
      specialEvents: specialEvents,
      products: products,
    },
  };
}
