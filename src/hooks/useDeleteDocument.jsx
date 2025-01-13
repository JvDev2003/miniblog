import { useState, useEffect, useReducer } from "react";
import { db } from '../firebase/config'
import { doc, deleteDoc } from "firebase/firestore";

// estado inicial da action
const initialState = {
    loading: null,
    error: null
}

// comportamentos dependendo do tipo da action
const deleteReducer = (state, action) => {
    switch (action.type) {
        case "LOADING":
            return { loading: true, error: null }
        case "DELETED_DOC":
            return { loading: false, error: null }
        case "ERROR":
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

// hook com a logica de inserção de um documento na coleção
export const useDeleteDocument = (docCollection) => {

    //cria um rook de reducer que utiliza o INSERT REDUCER para alterar o INITIALSTATE
    const [response, dispatch] = useReducer(deleteReducer, initialState)

    //deal with memory leak
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const deleteDocument = async (id) => {
        checkCancelBeforeDispatch({
            type: "LOADING",
        })
        try {

            const deletedDocument = await deleteDoc(doc(db, docCollection, id))

            checkCancelBeforeDispatch({
                type: "DELETED_DOC",
                payload: deletedDocument
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
    }, [])

    return { deleteDocument, response }
}