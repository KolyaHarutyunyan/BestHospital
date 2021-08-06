// import { API_BASE } from '../constants';
import axios from "axios";

// const path = `${API_BASE}`;
// const token = localStorage.getItem('access-token')
// const header = { headers: { 'access-token': token } }

export const authService = {

    createAdminService: (body) => axios.post(`/staff/superAdmin`, body),

    editAdminByIdService: (id, body) => axios.patch(`/staff/${id}`, body),

    getAdminsService: () => axios.get('/staff'),

    getAdminByIdService: (id) => axios.get(`/staff/${id}`,),

    activateAdminService: (id) => axios.patch(`/authn/${id.id}/activate`,),

    inactivateAdminService: (id) => axios.patch(`/authn/${id.id}/inactivate`),


};
