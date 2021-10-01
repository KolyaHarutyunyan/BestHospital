import axios from "axios";

export const authService = {

    createAdminService: (body) => axios.post(`/staff`, body),

    editAdminByIdService: (id, body) => axios.patch(`/staff/${id}`, body),

    getAdminsService: ({data}) => {
        if (data) {
            return axios.get(`/staff/?skip=${data.start}&&limit=${data.end}&&status=${data.status}`)
        } else {
            return axios.get('/staff')
        }
    },
    getAdminByIdService: (id) => axios.get(`/staff/${id}`),

    createCredentialService: (body) => axios.post(`/scredential`, body),

    getCredentialService: (id) => axios.get(`/scredential/staff/${id}/credential`),

    editCredentialByIdService: (id, body) => axios.patch(`/scredential/${id}`, body),

    deleteCredentialByIdService: (id) => axios.delete(`/scredential/${id}`),



    getEmploymentService: (id) => axios.get(`/employment/${id}`),

    createEmploymentService: (body) => axios.post(`/employment` , {body}),

    createServService: (body) => axios.post(`/service` , {body}),
};
