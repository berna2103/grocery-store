import { getContentfulItem } from "../../contentful/Contentful";
import styles from "./categories.module.css";

export default function CategoryId(props) {
  const subCategories = props.subCategories.subCategory;

  if (!subCategories) {
    return <p>No items found!</p>;
  }

  return (
    <div className={`container`}>
      {console.log(props)}
      <div>
        <h1 className={`display-6 mt-3`}>{props.subCategories.categoryName}</h1>
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
                {subCategory.fields.name}
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

export async function getServerSideProps(context) {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  //const [promotions, isLoading] = useContentful('corporation')
  const { categoryId } = context.params;

  const subCategories = await getContentfulItem(categoryId);

  return {
    props: {
      subCategories,
    },
  };
}
