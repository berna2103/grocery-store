import React from "react";
import { useState, useEffect } from "react";
import { db } from "../config/firebaseConfig";
import { doc, onSnapshot } from "firebase/firestore";

export const useGetDocument = (collection, docID) => {

  const [ document, setDocument ] = React.useState({})
  const [ isPending, setIsPending ] = React.useState(false)
  const [ error, setError ] = React.useState({})

  React.useEffect(() => { 
        
    const fetchData = async() => {

      try {   
      setIsPending(true)
      const docRef = doc(db, collection, docID)
      onSnapshot(docRef , (doc) => {
        if(doc.exists()){
          let data = doc.data()
          setDocument(data)
          setIsPending(false)
      }
      }) 

      }catch(err){
          console.log(err)
          setIsPending(false)
          setError(err)
        }
      }
     
      fetchData()

    return () => fetchData() // Clean up function
  }, [collection, docID])
   
    return { document, isPending, error }
}