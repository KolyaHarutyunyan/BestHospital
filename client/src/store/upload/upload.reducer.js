import {GET_UPLOADS_ERROR, GET_UPLOADS_SUCCESS} from "./upload.types";

const initialState = {
    uploadedInfo:[]
};

export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {

        /** Get Uploads */

        case GET_UPLOADS_SUCCESS:
            return {
                ...state,
                uploadedInfo: action.payload
            }

        case GET_UPLOADS_ERROR:
            return {
                ...state,
                uploadedInfo: ''
            }

            /** End */


        default:
            return state;
    }
};
