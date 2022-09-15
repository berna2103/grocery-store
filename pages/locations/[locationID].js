import React from "react";
import { useRouter } from "next/router";
import { getContentfulItem } from "../../contentful/Contentful";
import styles from "./locations.module.css";

export default function Location(props) {
  const router = useRouter();
  const storeID = router.query.locationID;

  const data = props.entries;

  if (!data) {
    return <p>Loading ....</p>;
  }

  return (
    <div className={`container ${styles.storeContainer}`}>
      <div className={`row pt-4`}>
        <div className={`col-lg-5 mb-4 col-md-5 my-auto text-center`}>
          <h1 className={`display-6 mt-4`}>{data.storeName}</h1>

          <p className={`text-muted`}>
            <i class="bi bi-phone"></i> {data.phoneNumber}
          </p>
          <address className={`text-muted`}>
            <span>
              <i class="bi bi-geo-alt-fill"></i> {data.address.street}{" "}
            </span>
            <span>{data.address.city}</span>
            <span> {data.address.state}</span>
            <span>, {data.address.zipcode}</span>
          </address>

          <div className={`card pt-3`}>
            <p className={`lead text-danger`}>
              <i class="bi bi-clock"></i> Store Hours
            </p>
            <ul className={`list-group list-group-flush`}>
              {data.storeHours.map((line) => (
                <li className={`list-group-item`} key={line.id}>
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={`col-lg-7 col-md-7 m-0`}>
          <img
            className={`image-fluid m-0 ${styles.storeImage}`}
            src={data.locationImage.fields.file.url}
            alt={data.storeName}
          />
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const [promotions, isLoading] = useContentful('corporation')
  const { locationID } = context.params;

  const entries = await getContentfulItem(locationID);

  return {
    props: {
      entries,
    },
  };
}
