import axios from 'axios';

export const payrollService = {

    createPayCodeGlobalService: (body) => axios.post(`/paycodetype`, body),

    getPayCodeGlobalService: () => axios.get(`/paycodetype`),

    editPayCodeByIdGlobalService: (id, body) => axios.patch(`/paycodetype/${id}`, body),

    deletePayCodeByIdService: (id) => axios.delete(`/paycodetype/${id}`),

    createOvertimeSettingsGlobalService: (body) => axios.post(`/overtime`, body),

    getOvertimeSettingsGlobalService: () => axios.get(`/overtime`),

    editOvertimeSettingsByIdGlobalService: (id, body) => axios.patch(`/overtime/${id}`, body),

    deleteOvertimeSettingsByIdService: (id) => axios.delete(`/overtime/${id}`),

};