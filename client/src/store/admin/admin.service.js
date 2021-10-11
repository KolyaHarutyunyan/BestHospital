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



    getEmploymentService: (id) => axios.get(`/employment/staff/${id}`),

    createEmploymentService: (body) => axios.post(`/employment` , body),


    editEmploymentService: (body,id) => axios.patch(`/employment/${id}` , body),


    getPayCodeService: (id) => axios.get(`/paycode/employment/${id}`),

    createPayCodeService: (body) => axios.post(`/paycode`, body),

    getStaffServService: (id) => axios.get(`/staff/${id}/service`),

    createStaffServService: (id,serviceId) => axios.post(`/staff/${id}/service/${serviceId}`),


    deleteStaffServService: (id,serviceId) => axios.delete(`/staff/${id}/service/${serviceId}`),


    // isClinicianService: (id) => axios(``),
};
