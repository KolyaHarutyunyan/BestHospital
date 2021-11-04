import {
    CREATE_UPLOAD, DELETE_UPLOADS, EDIT_UPLOAD, GET_UPLOADS

} from "./upload.types";

/** Upload Requests, here is All requests for Upload */

/** Create Upload */

export const createUpload = (body , createInfo) => {
    return {
        type: CREATE_UPLOAD,
        payload: { body, createInfo }
    }
}

/** End */

/** Create Upload */

export const editUpload = (body , id, resource) => {
    return {
        type: EDIT_UPLOAD,
        payload: { body, id, resource }
    }
}

/** End */

/** Get Upload */

export const getUpload = (resource) => {
    return {
        type: GET_UPLOADS,
        payload: { resource }
    }
}

/** End */

/** D Upload */

export const delUpload = (id,authenticationsId) => {
    return {
        type: DELETE_UPLOADS,
        payload: { id,authenticationsId}
    }
}

/** End */






