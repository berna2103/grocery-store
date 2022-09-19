import React from 'react'
import { getContentfulItems } from '../../contentful/Contentful';
import LocationCard from '../../components/LocationCard/LocationCard';

export default function Locations(props) {

  const data = props.locations
  return (
    <div className={`container`}>
      <h1 className={`display-6 mt-3`}>Our Locations</h1>
      <div className={`row`}>
      {data.map((location) =>
            location.locations.map((store) => (
              <LocationCard store = { store }/>
            ))
          )}
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const entries = await getContentfulItems("corporation");

  const locations = entries.map((p) => {
    return p.fields;
  });
  return {
    props: {
      locations: locations,
    },
  };
}
