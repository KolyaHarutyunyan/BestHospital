import axios from "axios";

export const authService = {

    createAdminService: (body) => axios.post(`/staff`, body),

    editAdminByIdService: (id, body) => axios.patch(`/staff/${id}`, body),

    getAdminsService: (status) => status || status === 0 ? axios.get(`/staff/?status=${status}`) : axios.get(`/staff/`),

    getAdminByIdService: (id) => axios.get(`/staff/${id}`),

    createCredentialService: (body) => axios.post(`/staff/credential`, body),

    getCredentialByIdService: (id) => axios.get(`/staff/${id}/credential`),

    editCredentialByIdService: (id, body) => axios.patch(`/staff/${id}/credential`, body),

    deleteCredentialByIdService: (id) => axios.delete(`/staff/${id}/credential`),

};
