import React from "react";
import { getContentfulItem } from "../../contentful/Contentful";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function Product(props) {
  const data = props.products;
  const pageTitle = props.title;

  if (!data) {
    return <p>No Products Found!</p>;
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

export async function getServerSidePropsclear(context) {

  const { productId } = context.params;

  const products = await getContentfulItem(productId[1]);

  return {
    props: {
      products: products,
      title: productId[0]
    },
  };
}

