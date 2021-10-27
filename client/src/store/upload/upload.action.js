import {
    CREATE_UPLOAD, DELETE_UPLOADS, GET_UPLOADS

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

/** Get Upload */

export const getUpload = (resource) => {
    return {
        type: GET_UPLOADS,
        payload: { resource }
    }
}

/** End */

/** D Upload */

export const delUpload = (id, officeId) => {
    return {
        type: DELETE_UPLOADS,
        payload: { id, officeId  }
    }
}

/** End */






