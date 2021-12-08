import axios from "axios";

export const authService = {
    /** Create, Upload */
    assignUploadService: (body) => {
        let formData = new FormData();
        formData.append("file", body);
        return axios.post('/files/upload', formData, {auth:true})
    },
    createUploadService: (info) => axios.post('/files', info, {auth:true}),
    /** End */

    /** Get Uploads */
    getUploadsService: (resource) => axios.get(`/files/${resource}`, {auth:true}),

    getDelUploadsService: (resource, onModel) => axios.get(`/files/${onModel}`, {auth:true}),
    /** End */

    /** Delete Uploads */
    deleteUploadsService: (id) => axios.delete(`/files/${id}`, {auth:true}),
    /** End */

    /** Edit Uploads */
    editUploadService: (body, id) => axios.patch(`/files/${id}`, body, {auth:true})
    /** End */
};
