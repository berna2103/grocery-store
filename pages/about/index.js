import React from "react";
import styles from "./about.module.css";
import { getContentfulItems } from "../../contentful/Contentful";
import LocationCard from "../../components/LocationCard/LocationCard";

export default function About(props) {
  const data = props.locations;

  if (!data) {
    return <p>Loadding data ....</p>;
  }
  return (
    <div className={`about`}>
      <div className="container">
        <h1 className="display-5 mt-3">About our company</h1>
        <img
          className={`img-fluid mt-3 mb-4 ${styles.imgSize}`}
          src="https://www.petesfresh.com/sites/default/files/stores/East118th.jpg"
          alt="about"
        />

        <h1 className="display-6">Our Story</h1>
        <p className="lead text-muted">
          At Pete’s Fresh Market we believe in giving you the best quality
          products for the best value. We got our start in the early 1970s as a
          small, full-service produce stand on the south side of Chicago and
          have not strayed far from those humble beginnings. Produce is still
          the heart and soul of our business, as our fruit and vegetables
          continue to be hand-picked and delivered daily.
        </p>
        <p className={`lead text-muted`}>
          Extending beyond fresh produce, each of our stores has a full service
          kitchen, bakery, and deli with dedicated and artistic staff. In-house
          butchers are at your service to answer your questions, assist in your
          selection, and prepare our fine meats to your exact specifications.
          Finally, no supermarket would be complete without aisles of your
          pantry essentials. We boast thousands of top quality groceries and
          imports, including a wide array of international, gluten-free, and
          organic products. As a family owned and operated business with over 50
          years of experience, Pete’s Fresh Market has stayed true to its core
          values: delivering the highest quality and freshest products at an
          honest price.
        </p>
      </div>
      <div className={`container`}>
        <h1 className="display-5">Store Locations</h1>
        <div className={`row`}>
          {data.map((location) =>
            location.locations.map((store) => (
              <LocationCard store = { store }/>
            ))
          )}
        </div>
      </div>
    </div>
  );
}


export async function getServerSideProps() {
  const entries = await getContentfulItems("corporation");

  const locations = entries.map((p) => {
    return p.fields;
  });
  return {
    props: {
      locations,
    },
  };
}
