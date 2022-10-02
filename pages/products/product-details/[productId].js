import React from "react";
import { getContentfulItem } from "../../../contentful/Contentful";
import styles from "./productdetails.module.css";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import AddToCartButton from "../../../components/AddToCartButton/AddToCartButton";

export default function ProductDetails(props) {
  const productData = props.product;

  if (!productData) {
    return <p>{console.log(productData)}</p>;
  }
  return (
    <div className={`container`}>
      <div className={`row mt-5`}>
        <div className={`col-lg-5 col-md-6 col-sm-12`}>
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
            spaceBetween={1}
            slidesPerView={1}
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
          >
            {!productData.productImage[0].fields.file.url ? (
              <p>No Image</p>
            ) : (
              productData.productImage.map((img) => (
                <SwiperSlide className={`text-center`}>
                  <img
                    className={`img-fluid ${styles.sliderImage}`}
                    src={img.fields.file.url}
                    alt={productData.productName}
                  />
                </SwiperSlide>
              ))
            )}
          </Swiper>
        </div>
        <div className={`col-lg-7 col-md-6 col-sm-12 my-auto p-3`}>
          <h1 className={`display-6 text-danger`}>{productData.productName}</h1>
          <p
            className={`text-secondary`}
          >{`Calories per serving: ${productData.calories}`}</p>

          {productData.isOnSale === true && productData.onSalePrice > 0 ? (
            <div>
              <p className={`text-danger lead`}>
                ${productData.onSalePrice} on sale!
              </p>
              <p className={`text-decoration-line-through`}>
                ${productData.price} / each.
              </p>
            </div>
          ) : (
            <p className={`text-danger`}>${productData.price} / each.</p>
          )}
          <AddToCartButton id={props.id} product={productData}/>
        </div>
      </div>
      <nav>
        <div className="nav nav-tabs mt-3" id="nav-tab" role="tablist">
          <button
            className="nav-link active me-2"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Details
          </button>
          <button
            className="nav-link me-2"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Ingredients
          </button>
          <button
            className="nav-link me-2"
            id="nav-contact-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-contact"
            type="button"
            role="tab"
            aria-controls="nav-contact"
            aria-selected="false"
          >
            Manufacturer
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane border fade show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          <div className={`container`}>
            {!productData.details ? (
              <p className={`mt-4 fs-6`}>See package for details.</p>
            ) : (
              <div>
                <p className={`mt-2`}>SKU: {productData.sku}</p>
                {productData.details.content.map((detail) =>
                  detail.content.map((data) => (
                    <p className={`mt-2 fs-6`}>{data.value}</p>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="tab-pane border fade"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <div className={`container`}>
            {!productData.ingredients ? (
              <p className={`mt-4 fs-6`}>See package for details.</p>
            ) : (
              <div>
                {productData.ingredients.content.map((detail) =>
                  detail.content.map((data) => (
                    <p className={`mt-2 fs-6`}>{data.value}</p>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
        <div
          className="tab-pane border fade"
          id="nav-contact"
          role="tabpanel"
          aria-labelledby="nav-contact-tab"
        >
          <div className={`container mt-4`}>
            {!productData.manufacturer ? (
              <p className={`fs-6 mt-4`}>See package for details.</p>
            ) : (
              <p className={`fs-6 mt-4`}> {productData.manufacturer}</p>
            )}
          </div>
        </div>
      </div>
      <div className={`container mt-4`}>
        <p className={`fw-bold`}>Disclaimer</p>
        <p className={`fs-6`}>
          We rely on product packaging and data from third-party sources to
          provide the content to you, including dietary and allergen content. We
          do not guarantee the accuracy, completeness, or availability of such
          information. Content is for general informational purposes only. You
          should not rely solely on the information displayed on our website.
          Actual product may vary. Always read labels, warnings, and directions
          prior to use or consumption. If you have questions or require more
          information about a product, please contact the manufacturer directly.
        </p>
      </div>
    </div>
  );
}

export async function getStaticProps(context) {

  const { productId } = context.params;

  const product = await getContentfulItem(productId);

  return {
    props: {
      product,
      id: productId,
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
    // // Call an external API endpoint to get posts

    // const entries = await getContentfulItems("product");
    // // Get the paths we want to prerender based on posts
    // // In production environments, prerender all pages
    // // (slower builds, but faster initial page load)
    // const paths = entries.map((entry) => ({
    //   params: { productId: entry.sys.id },
    // }))
  
    // { fallback: false } means other routes should 404
    return { paths: [], fallback: 'blocking' }
}
