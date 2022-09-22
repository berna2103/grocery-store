import React from 'react'
import { getContentfulItem } from '../../contentful/Contentful';

export default function SpecialtyDiets(props) {

  const diet = props.diet
  const pageTitle = props.title

  return (
    <div className={`container`}>
      <h1 className={`display-6 mt-5`}>
      {pageTitle} products</h1>
      
      </div>
  )
}

export async function getStaticProps(context) {

  const { dietId } = context.params;

  console.log(context)

  const diet = await getContentfulItem(dietId[1]);

  return {
    props: {
      diet: diet,
      title: dietId[0]
    },
  };
}


export async function getStaticPaths() {

  //  const entries = await getContentfulItems("diet");

    return { paths: [], fallback: 'blocking'}
}


