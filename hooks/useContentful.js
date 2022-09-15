import { useState, useEffect } from 'react'
import { getContentfulItems } from '../contentful/Contentful'



export default function useContentful(query) {
  const [contentfulItems, setContentfulItems] = useState([])
  const [isLoading, setLoading] = useState(true)

  const promise = getContentfulItems(query)

  useEffect(() => {
    promise.then(items => {
      setContentfulItems(items)
      setLoading(false)
    })
  }, [])

  return [contentfulItems, isLoading]
}