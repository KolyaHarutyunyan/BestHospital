import axios from "axios";

export const systemService = {

    createCredentialGlobalService: (body) => axios.post(`/credential`, body),

    getCredentialService: () => axios.get(`/credential`),

    editCredentialByIdGlobalService: (id, body) => axios.patch(`/credential/${id}`, body),

    createServiceGlobalService: (body) => axios.post(`/service`, body),

    getServicesService: () => axios.get(`/service`),

    editServiceByIdGlobalService: (id, body) => axios.patch(`/service/${id}`, body),

    deleteServiceByIdService: (id) => axios.delete(`/service/${id}`),

};