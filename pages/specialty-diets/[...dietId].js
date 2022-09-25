import React from "react";
import styles from "./dietId.module.css";
import { getContentfulItem } from "../../contentful/Contentful";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function SpecialtyDiets(props) {
  const diet = props.diet;
  const pageTitle = props.title;

  return (
    <div className={`container`}>
      <div className={`container mt-5`}>
        <div className={`row bg-light `}>
          <div className={`col-lg-6 my-auto mt-5`}>
            <div className={`container`}>
              <h1 className={`display-6`}>{pageTitle}</h1>
              <p className={`lead`}>{diet.description}</p>
            </div>
          </div>
          <div className={`col-lg-6 g-0 order-first`}>
            <img
              className={`img-fluid ${styles.banner}`}
              src={diet.imageUrl.fields.file.url}
              alt={diet.title}
            />
          </div>
        </div>
      </div>
      <div>
        <h1 className={`display-6 mt-5`}>Buy {pageTitle} friendly products</h1>
      </div>
      <div className={`row g-2`}>
        {!diet.products ? (
          <p></p>
        ) : (
          diet.products.map((product) => (
            <div className={`col-lg-2 col-md-4 col`}>
              <ProductCard product={product} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {
  const { dietId } = context.params;

  const diet = await getContentfulItem(dietId[1]);

  return {
    props: {
      diet: diet,
      title: dietId[0],
    },
  };
}

export async function getStaticPaths() {
  //  const entries = await getContentfulItems("diet");

  return { paths: [], fallback: "blocking" };
}
