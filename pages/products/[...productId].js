import React from "react";
import { getContentfulItem, getContentfulItems } from "../../contentful/Contentful";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loaading from "../../components/Loading/Loaading";

export default function Product(props) {
  const data = props.products;
  const pageTitle = props.title;

  if (!data) {

    return <div className={`container`}><Loaading /></div>;
  }

  return (
    <div className={`container-fluid`}>
      <div className={`container`}>
        <h1 className={`display-6 text-danger mt-4`}>{pageTitle}</h1>
      </div>
      <div className={`row`}>
      </div>
      <div className={`row mt-3`}>
        <div className={`col-3 border`}>
          <p className={`fs-6 text-danger`}>Filters</p>
        </div>
        <div className={`col-9`}>
          <div className={`row`}>
            {data.products.map((product) => (
              <div className={`col-lg-3 col-md-4 col-sm-6 mb-2`}>
                <ProductCard product = { product }/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {

  const { productId } = context.params;

  const products = await getContentfulItem(productId[1]);

  return {
    props: {
      products: products,
      title: productId[0]
    },
    revalidate:1
  };
}

export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  // if (process.env.SKIP_BUILD_STATIC_GENERATION) {
  //   return {
  //     paths: [],
  //     fallback: false,
  //   }
  // }
    // Call an external API endpoint to get posts

    const entries = await getContentfulItems("product");
    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = entries.map((entry) => ({
      params: { productId:[entry.sys.id] },
    }))
    // { fallback: false } means other routes should 404
    return { paths, fallback: true}
}
