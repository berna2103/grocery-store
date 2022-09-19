import React from "react";
import { getContentfulItems } from "../../contentful/Contentful";
import styles from "./categories.module.css";

export default function Deparments(props) {
  const data = props.categories;

  if (!data) {
    console.log(data);
    return <p>Loading .....</p>;
  }
  return (
    <div className={`container`}>
      <h1 className={`display-6 mt-3`}>Shop by category</h1>
      <div className={`row mt-5`}>
        {data.map((p) =>
          p.map((item) => (
            <div className={`col-lg-3 col-md-4 col-sm-6 col-xs mb-2`}>
              <div className={`card bg-light ${styles.card} ${styles.cardOnHover}`}>
                <div className={`row text-muted p-2`}>
                  <div className={`col-12 text-uppercase ms-3 mt-3`}>
                    <p className={`lead`}>{`${item.fields.categoryName} (${item.fields.subCategory.length})`}</p>
                  </div>
                  <div className={`col-12 text-center mt-3 mb-5`}>
                    {!item.fields.categoryImage.fields.file.url ? (
                      <p></p>
                    ) : (
                      <img
                        className={`img-fluid ${styles.imageResponsive}`}
                        src={item.fields.categoryImage.fields.file.url}
                        alt={item.fields.categoryName}
                      />
                    )}
                  </div>
                </div>
                <a
                  href={`categories/${item.sys.id}`}
                  className="stretched-link"
                ></a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}


export async function getStaticProps() {
const entries = await getContentfulItems("category");

  const categories = entries.map((product) => {
    const data = [];
    data.push({ fields: product.fields, sys: product.sys });
    return data;
  });

  return {
    props: { categories: categories },
    revalidate: 600,
  };
}
