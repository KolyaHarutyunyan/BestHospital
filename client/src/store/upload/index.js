import {createUpload, delUpload, getUpload,} from "./upload.action";

export {uploadReducer} from './upload.reducer';
export {watchUpload} from './upload.saga';

export const uploadActions = {
    /** Create, Upload */
    createUpload,
    /** End */

    /** Get Uploads */
    getUpload,
    /** End */

    /** Del Uploads */
    delUpload
    /** End */

}

