import axios from 'axios';

export const payrollService = {

    createPayCodeGlobalService: (body) => axios.post(`/paycodetype`, body),

    getPayCodeGlobalService: () => axios.get(`/paycodetype`),

    editPayCodeByIdGlobalService: (id, body) => axios.patch(`/paycodetype/${id}`, body),

    deletePayCodeByIdService: (id) => axios.delete(`/paycodetype/${id}`),

};