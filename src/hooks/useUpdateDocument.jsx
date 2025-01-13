import { useState, useEffect, useReducer } from "react";
import { db } from '../firebase/config'
import { updateDoc, doc } from "firebase/firestore";

// estado inicial da action
const initialState = {
    loading: null,
    error: null
}

// comportamentos dependendo do tipo da action
const updateReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return {loading: true, error: null}
        case "UPDATED_DOC":
            return {loading: false, error: null}
        case "ERROR":
            return {loading: false, error: action.payload}
        default:
            return state
    }
}

// hook com a logica de inserção de um documento na coleção
export const useUpdateDocument = (docCollection) => {
    
    //cria um rook de reducer que utiliza o INSERT REDUCER para alterar o INITIALSTATE
    const [response, dispatch] = useReducer(updateReducer, initialState)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled) {
            dispatch(action)
        }
    }

    const updateDocument = async(id, data) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        })
        try {
            
            const docRef = await doc(db, docCollection, id)

            const updatedDocument = await updateDoc(docRef, data)

            checkCancelBeforeDispatch({
                type: "UPDATED_DOC",
                payload: updatedDocument
            })

        } catch (error) {
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message
            })
        }
    }

    // finaliza o componente para evitar a alteração após o state ser desmontado
    useEffect(() => {
        return () => setCancelled(true)
    },[])

    return {updateDocument, response}
}