import { useEffect, useState } from 'react'

import { getContentfulSingleItem } from '../contentful/Contentful'

export default function useSinglePost(slug) {
  const promise = getContentfulSingleItem(slug)

  const [item, setItem] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    promise.then(result => {
      
      if (result){
      setItem(result[0].fields)
      setLoading(false)}
    })
    console.log(item)
  }, [])

  return [item, isLoading]
}