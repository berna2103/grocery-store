import Head from "next/head";
import styles from "../styles/Home.module.css";
import { getContentfulItems } from "../contentful/Contentful";

export default function Home(props) {
  const locations = props.locations;

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

      {locations.map((location) =>
        location.locations.map((store) => (
          <div className={`container mt-2`}>
            <a
              onClick={selectStore}
              key={store.sys.id}
              className={`text-secondary`}
            >
              <span className={`text-danger`}>Shopping at: </span>
              {store.fields.storeName}
            </a>
            {console.log(store)}
          </div>
        ))
      )}
    </div>
  );
}
// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries.
export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const [promotions, isLoading] = useContentful('corporation')
  const entries = await getContentfulItems("corporation");

  const locations = entries.map((p) => {
    return p.fields;
  });
  //  const {fields, sys } = corporation
  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time

  return {
    props: {
      locations,
    },
  };
}
