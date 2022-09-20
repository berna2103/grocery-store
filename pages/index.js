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
import { useState } from "react";

export default function Home(props) {
  const locations = props.locations;
  const specialEvents = props.specialEvents;
  const products = props.products;
  const diets = props.diet;

  const deals = [];
  const moreDeals = [];
  const event = [];

  if (!props.locations) {
    console.log(locations);
    return <Loaading />;
  }

  if (!props.specialEvents) {
    console.log(specialEvents);
    return <Loaading />;
  }

  if (!props.products) {
    console.log(products);
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
              <div className={`col-lg-4`}>
                <Card
                  key={diet.sys.id}
                  data={diet}
                  id={diet.sys.id}
                  title={diet.fields.title}
                  buttonLabel={diet.fields.buttonLabel}
                  description={diet.fields.description}
                  imageUrl={diet.fields.imageUrl.fields.file.url}
                />
              </div>
            ))}
          </div>
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

export async function getServerSideProps() {
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

  return {
    props: {
      diet: diet,
      locations: locations,
      specialEvents: specialEvents,
      products: products,
    },
  };
}
