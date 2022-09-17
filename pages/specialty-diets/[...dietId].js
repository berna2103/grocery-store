import React from 'react'
import { getContentfulItem } from '../../contentful/Contentful';

export default function SpecialtyDiets() {
  return (
    <div>SpecialtyDiets</div>
  )
}

export async function getServerSideProps(context) {
    // Call an external API endpoint to get posts.
    // You can use any data fetching library
    //const [promotions, isLoading] = useContentful('corporation')
    const { productId } = context.params;
  
    const products = await getContentfulItem(productId[1]);
  
    return {
      props: {
        products: products,
        title: productId[0]
      },
    };
  }