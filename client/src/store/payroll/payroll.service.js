import axios from 'axios';

export const payrollService = {

    createPayCodeGlobalService: (body) => axios.post(`/paycodetype`, body, {auth:true}),

    getPayCodeGlobalService: () => axios.get(`/paycodetype`, {auth:true}),

    editPayCodeByIdGlobalService: (id, body) => axios.patch(`/paycodetype/${id}`, body, {auth:true}),

    deletePayCodeByIdService: (id) => axios.delete(`/paycodetype/${id}`, {auth:true}),

    createOvertimeSettingsGlobalService: (body) => axios.post(`/overtime`, body, {auth:true}),

    getOvertimeSettingsGlobalService: () => axios.get(`/overtime`, {auth:true}),

    editOvertimeSettingsByIdGlobalService: (id, body) => axios.patch(`/overtime/${id}`, body, {auth:true}),

    deleteOvertimeSettingsByIdService: (id) => axios.delete(`/overtime/${id}`, {auth:true}),

};