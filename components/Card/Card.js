import React from "react";
import Link from "next/link";
import style from './card.module.css'

export default function Card({title, description, imageUrl, buttonLabel, id}) {

  return (
    <div className={`card ${style.card}`}>
      <div className={`row`}>
        <div className={`col-7 my-auto`}>
          <h1 className={`lead fw-bold ms-3`}>{title}</h1>
          <p className={`fs-6 text-muted ms-3`}>{description}</p>
          <Link href={`/specialty-diets/${id}`}>
            <a className={`text-danger ms-3`}>
              {buttonLabel}
              <i className="bi bi-arrow-right-circle ms-2"></i>
            </a>
          </Link>
        </div>
        <div className={`col-5`}>
          <img
            className={`${style.cardImage}`}
            src={imageUrl}
            alt={title}
          />
        </div>
      </div>
    </div>
  );
}
