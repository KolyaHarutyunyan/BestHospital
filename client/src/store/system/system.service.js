import axios from "axios";

export const systemService = {

    createCredentialGlobalService: (body) => axios.post(`/credential`, body),

    getCredentialService: () => axios.get(`/credential`),

    editCredentialByIdGlobalService: (id, body) => axios.patch(`/credential/${id}`, body),

    deleteCredentialByIdService: (id) => axios.delete(`/credential/${id}`),

    createServiceGlobalService: (body) => axios.post(`/service`, body),

    getServicesService: () => axios.get(`/service`),

    editServiceByIdGlobalService: (id, body) => axios.patch(`/service/${id}`, body),

    deleteServiceByIdService: (id) => axios.delete(`/service/${id}`),

    createDepartmentGlobalService: (body) => axios.post(`/department`, body),

    getDepartmentsService: () => axios.get(`/department`),

    editDepartmentByIdGlobalService: (id, body) => axios.patch(`/department/${id}`, body),

    deleteDepartmentByIdService: (id) => axios.delete(`/department/${id}`),

    createJobGlobalService: (body) => axios.post(`/job`, body),

    getJobsService: () => axios.get(`/job`),

    editJobByIdGlobalService: (id, body) => axios.patch(`/job/${id}`, body),

    deleteJobByIdService: (id) => axios.delete(`/job/${id}`),

};