import { useState, useEffect, useRef } from "react"
import { db } from '../config/firebaseConfig'

// Firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore'

export const useCollection = (c, _q) => {

  const [documents, setDocuments] = useState([])  
  const q = useRef(_q).current  
   useEffect(() => {
     let ref = collection(db, c)
      // if query is passes then ref changes to pull query request
     if(q){
        ref = query(ref, where(...q))
     }  
     const unsub = onSnapshot(ref, (snapshot) => {
        let results = []  
        snapshot.docs.forEach(doc => {
           results.push({...doc.data(), id: doc.id})
         })
        setDocuments(results)
     })
     return () => unsub() // Clean up function
  },[c])

  return { documents }
}