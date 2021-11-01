import {createUpload, delUpload, editUpload, getUpload,} from "./upload.action";

export {uploadReducer} from './upload.reducer';
export {watchUpload} from './upload.saga';

export const uploadActions = {
    /** Create, Upload */
    createUpload,
    /** End */

    /** Edit, Upload */
    editUpload,
    /** End */

    /** Get Uploads */
    getUpload,
    /** End */

    /** Del Uploads */
    delUpload
    /** End */

}

