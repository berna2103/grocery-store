import React from 'react'
import Card from '../../components/Card/Card';
import Carousel from '../../components/Carousels/Carousel';
import DietSlides from '../../components/Carousels/CarouselItems/DietSlides';
import { getContentfulItems } from '../../contentful/Contentful';

export default function Diets(props) {

  const allDiets = props.diets
  const popularDiets = props.popularDiets

  const popularCarousel = []


  return (
   <div className={`container`}>
      <h1 className={`display-6 mt-5`}>Trendy diets</h1>
      {popularDiets.map((item, index) => {
            popularCarousel.push(<DietSlides key={item.sys.id} 
              title = {item.fields.title} 
              id = {item.sys.id}
              description ={item.fields.description}
              buttonLabel = {item.fields.buttonLabel}
              link={`/specialty-diets/${item.fields.title}/${item.sys.id}`}
              imageUrl ={item.fields.imageUrl.fields.file.url}/>);
          }
        )}
        <Carousel items={popularCarousel} />

        <div className={`container mt-5`}>
          <h1 className={`display-6`}>Explore other diets</h1>
          <div className={`row`}>
            {allDiets.map(diet => (
               <div className={`col-4`}>
                 <Card    
                  key={diet.sys.id}
                  data={diet}
                  id={diet.sys.id}
                  link={`/specialty-diets/${diet.fields.title}/${diet.sys.id}`}
                  title={diet.fields.title}
                  buttonLabel={diet.fields.buttonLabel}
                  description={diet.fields.description}
                  imageUrl={diet.fields.imageUrl.fields.file.url}/>
                </div>
            ))}
          </div>
        </div>
   </div>
  )
}

export async function getStaticProps() {
  const diets = await getContentfulItems("diet");

  const popularDiets = diets.filter((obj) => {
    return obj.fields.isPopular === true;
  });

  return {
    props: { diets: diets, popularDiets: popularDiets },
  };
}
