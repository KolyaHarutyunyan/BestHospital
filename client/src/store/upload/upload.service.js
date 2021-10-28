import axios from "axios";

export const authService = {
    /** Create, Upload */
    assignUploadService: (body) => {
        let formData = new FormData();
        formData.append("file", body);
        return axios.post('/files/upload', formData)
    },
    createUploadService: (info) => axios.post('/files', info),
    /** End */

    /** Get Uploads */
    getUploadsService: (resource) => axios.get(`/files/${resource}`),

    getDelUploadsService: (resource, onModel) => axios.get(`/files/${onModel}`),
    /** End */

    /** Delete Uploads */
    deleteUploadsService: (id) => axios.delete(`/files/${id}`)
    /** End */
};
