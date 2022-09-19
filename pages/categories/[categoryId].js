import { getContentfulItem, getContentfulItems } from "../../contentful/Contentful";
import styles from "./categories.module.css";

export default function CategoryId(props) {
  const subCategories = props.subCategories.subCategory;

  if (!subCategories) {
    return <p>No items found!</p>;
  }

  return (
    <div className={`container`}>
      <div className={`container mt-3`}>
        <h1 className={`display-6`}>Shop by category</h1>
      </div>
      <div className={`row mt-5`}>
        {subCategories.map((subCategory) => (
          <div className={`col-lg-2 col-md-3 col-sm-6 col-xm-3 mb-2`}>
            <div
              key={subCategory.sys.id}
              className={`card ${styles.card} ${styles.cardOnHover}`}
            >
              {!subCategory.fields.subcategoryImage.fields.file.url ? (
                <p></p>
              ) : (
                <img
                  className={`img-fluid rounded-circle ${styles.subcategoryCardImage}`}
                  src={subCategory.fields.subcategoryImage.fields.file.url}
                  alt={subCategory.fields.name}
                />
              )}
              <div className={`card-title text-muted text-center mt-3`}>
                {`${subCategory.fields.name} (${subCategory.fields.products.length})`}
              </div>
              <a
                href={`/products/${subCategory.fields.name}/${subCategory.sys.id}`}
                className="stretched-link"
              ></a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps(context) {

  const { categoryId } = context.params;
  const subCategories = await getContentfulItem(categoryId);

  return {
    props: {
      subCategories: subCategories,
    },
  };
}


export async function getStaticPaths() {
  // When this is true (in preview environments) don't
  // prerender any static pages
  // (faster builds, but slower initial page load)
  if (process.env.SKIP_BUILD_STATIC_GENERATION) {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }
    // Call an external API endpoint to get posts

    const entries = await getContentfulItems("category");
    // Get the paths we want to prerender based on posts
    // In production environments, prerender all pages
    // (slower builds, but faster initial page load)
    const paths = entries.map((entry) => ({
      params: { categoryId: entry.sys.id },
    }))
  
    // { fallback: false } means other routes should 404
    return { paths, fallback: false }
}
