import {CREATE_GLOBAL_NOTE, DELETE_GLOBAL_NOTE, EDIT_GLOBAL_NOTE, GET_GLOBAL_NOTES} from "./note.type";

export const getGlobalNotes = ( id,onModel) => {
    return {
        type: GET_GLOBAL_NOTES,
        payload: { id,onModel}
    }
}


export const createGlobalNote = (body) => {

    return {
        type: CREATE_GLOBAL_NOTE,
        payload: {
            body
        }
    }
}

export const editGlobalNote = (fId, id, body,onModel) => {
    return {
        type: EDIT_GLOBAL_NOTE,
        payload: {fId, body, id, onModel}
    }
}

export const deleteGlobalNote = (fId, id) => {
    return {
        type: DELETE_GLOBAL_NOTE,
        payload: {fId, id}
    }
}