import Link from "next/link";
import React from "react";
import styles from "./list.module.css"

export default function ListOfCategories(props) {
  const data = props.data;

  if (!data) {
    return <p>Loading .....</p>;
  }
  return (
    <div className={`container`}>
      <h1 className={`display-6 mt-3 mb-3`}>Shop by category</h1>
      <ul className={`fs-6 w-25 text-danger  list-group list-group-flush`}>
        {data.map((p) =>
          p.map((category) => (
            <Link href={`/categories/${category.sys.id}`}>
              <a>
                <li className={`list-unstyled`}>
                <img className={`rounded-circle ${styles.imageList}`} src={category.fields.categoryImage.fields.file.url} ></img>
                  {category.fields.categoryName} 
                 <i className="bi bi-arrow-right ms-2"></i>{" "}
                </li>
                <hr></hr>
              </a>
            </Link>
           
          ))
        )}
      </ul>
    </div>
  );
}
