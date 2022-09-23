import React from "react";
import styles from './dietId.module.css'
import { getContentfulItem } from "../../contentful/Contentful";
import ProductCard from '../../components/ProductCard/ProductCard'

export default function SpecialtyDiets(props) {
  const diet = props.diet;
  const pageTitle = props.title;

  return (
    <div className={`container`}>
      {console.log(diet.overview)}
      <h1 className={`display-6 mt-5 ms-2`}>{pageTitle} products</h1>
      <div className={`container `}>
        <img className={`img-fluid ${styles.banner}`} src={diet.imageUrl.fields.file.url} alt={diet.title}/>
      </div>
      <div className={`container`}>
      {!diet.overview ? (
              <p className={`mt-4 fs-6`}></p>
            ) : (
              <div>
                {diet.overview.content.map((detail) =>
                  detail.content.map((data) => (
                    <p className={`mt-2 fs-6`}>{data.value}</p>
                  ))
                )}
              </div>
            )}
      </div>
      <div>
        <h1 className={`display-6 mt-5`}>Buy products</h1>
      </div>
      {!diet.products ? <p></p> : diet.products.map(product => (
        <ProductCard product={product} />
      ))} 
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
