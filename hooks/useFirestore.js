// Add, remove and edit firestore documents

import { useReducer, useEffect, useState} from 'react'
import { db } from '../config/firebaseConfig'
import { addDoc, doc, Timestamp, collection, deleteDoc, updateDoc, setDoc, arrayRemove } from 'firebase/firestore' 

export const useFirestore = (firestoreCollection) => {
    let initialState = {
        document: null,
        isPending: false,
        error: null,
        success: null
    }
    const firestoreReducer= (state, action) => {
        switch(action.type){
            case 'IS_PENDING':
                return { isPending: true, document: null, success: false, error: null }
            case 'ADDED_DOCUMENT':
                return { isPending: false, document: action.payload, success: true, error: null }
            case 'DELETED_DOCUMENT':
                return { isPending: false, document: action.payload, success: true, error: null } 
            case 'UPDATED_DOCUMENT':
                return { isPending: false, document: action.payload, success: true, error: null }   
            case 'SET_DOCUMENT':
                return { isPending: false, document: action.payload, success: true, error: null } 
            case 'GET_DOCUMENT':
                return { isPending: false, document: action.payload, success: true, error: null }
            case 'ERROR':
                return {isPending: false, document: null, success: false, error: action.payload }
            default:
                return state
        }
    }
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    const [isCancelled, setIsCancelled] = useState(false)

    // only dispatch if not cancelled
    const dispatchIfNotCancelled = (action) => {
        if (!isCancelled){
            dispatch(action)
        }
    }
    //ref to firestore collection
    const ref = collection(db, firestoreCollection)   

    // add document
    const addDocument = async (document, id) => {
        dispatch('IS_PENDING')
        try {
            const createdAt = Timestamp.fromDate(new Date())
            if(id != null){
              const docRef = doc(db, firestoreCollection, id)
              const addedDocument = await setDoc(docRef, { ...document, createdAt}, { merge: true })
              dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument})
            } else{ 
              const addedDocument = await addDoc(ref, { ...document, createdAt})
              dispatchIfNotCancelled({ type: 'ADDED_DOCUMENT', payload: addedDocument})}
        } catch (err){
           
              dispatchIfNotCancelled({ type: 'ERROR', payload: err.message })
              
        }
    }

    // delete document
    const deleteDocument = async (id, firestoreCollection) => {
        dispatch('IS_PENDING')
        try{
            const ref = doc(db, firestoreCollection, id)
            deleteDoc(ref)
            dispatchIfNotCancelled({ type: 'DELETED_DOCUMENT', payload: deleteDocument})
        }catch(err){
            dispatchIfNotCancelled({ type: 'ERROR', payload:err.message })
        }
    }

    // update document
    const updateDocument = async (array, id) => {
        dispatch('IS_PENDING')
        try {
            if(array){
                const docRef = doc(db, firestoreCollection, id)
                const updateDocument = await updateDoc(docRef, {Categories: arrayRemove(array)}, {merge: true} )
                dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updateDocument}) 
            }
            const updatedAt = Timestamp.fromDate(new Date())
            const docRef = doc(db, firestoreCollection, id)
            const updatedDocument = await updateDoc(docRef, { ...document, updatedAt}, { merge: true })
            dispatchIfNotCancelled({ type: 'UPDATED_DOCUMENT', payload: updatedDocument}) 
            
        }catch(err){
            dispatchIfNotCancelled({ type: 'ERROR', payload:err.message })
        }
    }



    useEffect(() => {
        return setIsCancelled(true)
    },[])

    return { addDocument, deleteDocument, updateDocument, response  }

}