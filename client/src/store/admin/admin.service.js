import axios from "axios";

export const authService = {

    createAdminService: (body) => axios.post(`/staff`, body),

    editAdminByIdService: (id, body) => axios.patch(`/staff/${id}`, body),

    getAdminsService: (status) => status || status === 0 ? axios.get(`/staff/?status=${status}`) : axios.get(`/staff/`),

    getAdminByIdService: (id) => axios.get(`/staff/${id}`),

    createCredentialService: (body) => axios.post(`/scredential`, body),

    getCredentialService: (id) => axios.get(`/scredential/staff/${id}/credential`),

    editCredentialByIdService: (id, body) => axios.patch(`/scredential/${id}`, body),

    deleteCredentialByIdService: (id) => axios.delete(`/staff/${id}/credential`),

};
