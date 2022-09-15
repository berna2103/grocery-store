// import React from "react";
// import fs from "fs/promises";
// import path from "path";
import SmallCarousel from "../../components/Carousels/SmallCarousel/SmallCarousel";
import TopDealsCarousel from "../../components/Carousels/TopDealsCarousel/TopDealsCarousel";
import styles from "./offers.module.css";
import { getContentfulItems } from "../../contentful/Contentful";

export default function Offers(props) {
  const items = props.offers;
  return (
    <div className={`${styles.offers} container`}>
      <p className="display-4 text-danger">Top deals this week!</p>
      <p className="lead text-muted"></p>
      {console.log(items)}
      <TopDealsCarousel data={items} />
      <SmallCarousel data={items} />
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getStaticProps() {
  // Call an external API endpoint to get posts.å
  // You can use any data fetching library
  //const [promotions, isLoading] = useContentful('corporation')
  const entries = await getContentfulItems("product");

  const offers = entries.filter(obj => {
    return obj.fields.isOnSale === true;
  });
  
  
  // const categories = entries.map((product) => {
  //   const data = [];
  //   data.push({ fields: product.fields, sys: product.sys });
  //   return data;
  // });
  //  const {fields, sys } = corporation
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: { offers },
  };
}
