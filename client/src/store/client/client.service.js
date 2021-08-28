import axios from "axios";

export const authService = {
    getClientsService: () => axios.get(`/client`,),

    createClientService: ({payload}) => axios.post(`/client`, payload.body),

    deleteClientService: ({payload}) => axios.delete(`/client/${payload.id}`),

    editClientService: ({payload}) => axios.patch(`/client/${payload.id}`, payload.body),

    getClientByIdService: ({payload}) => axios.get(`/client/${payload.id}`, ),

    getClientContactsService: ({payload}) => axios.get(`/contact/client/${payload.id}`, ),

    createClientContactService: ({payload}) => axios.post(`/contact/client/${payload.id}`, payload.body),

    editClientContactService: ({payload}) => axios.patch(`/contact/${payload.id}`, payload.body),

    deleteClientContactService: ({payload}) => axios.delete(`/contact/${payload.id}`),

    getClientEnrollmentService: ({payload}) => axios.get(`/enrollment/client/${payload.id}`, ),

    createClientEnrollmentService: ({payload}) => axios.post(`/enrollment/client/${payload.id}/funder/${payload.funderId}`, payload.body),

    editClientEnrollmentService: ({payload}) =>  axios.patch(`/enrollment/${payload.id}/client/${payload.clientId}/funder/${payload.funderId}`, payload.body),

    deleteClientEnrollmentService: ({payload}) =>  axios.delete(`/enrollment/${payload.id}`),

    getClientAuthorizationService: ({payload}) => axios.get(`/authorization/client/${payload.id}` ),

    createClientAuthorizationService: ({payload}) => axios.post(`/authorization/client/${payload.id}/funder/${payload.funderId}`, payload.body),

    editClientAuthorizationService: ({payload}) =>  axios.patch(`/authorization/${payload.id}`, payload.body),

    deleteClientAuthorizationService: ({payload}) =>  axios.delete(`/authorization/${payload.id}`),
};


