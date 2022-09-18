import Head from "next/head";
import { getContentfulItems } from "../contentful/Contentful";
import Carousel from "../components/Carousels/Carousel";
import SpecialEvents from "../components/SpecialEvents/SpecialEvents";
import Dropdown from "../components/Dropdown/Dropdown";

export default function Home(props) {
  const locations = props.locations;
  const specialEvents = props.specialEvents;
  const event = [];

  if (!locations) {
    return <p>Loading .... </p>;
  }

  const selectStore = () => {};

  return (
    <div className={`container`}>
      <Head>
        <title>Pete's Fresh Market</title>
        <meta name="description" content="Most affordable groceries in town." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={`container text-center mb-3`}>
        <Dropdown list = { locations } />
      </div>

      {specialEvents.map((item) =>{
        event.push(<SpecialEvents key={item.sys.id} item={item} />)}
      )}

      <div>
        <Carousel items={event} />
      </div>
      

    </div>
  );
}

export async function getStaticProps() {

  const entries = await getContentfulItems("corporation");
  const specialEvents = await getContentfulItems("specialEvents");

  const locations = entries.map((p) => {
    return p.fields;
  })

  return {
    props: {
      locations: locations,
      specialEvents: specialEvents,
    },
    revalidate: 60
  };
}
