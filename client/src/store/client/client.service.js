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

    getClientAuthorizationServService: ({payload}) => axios.get(`/authorizationservice/authorization/${payload.id}` ),

    createClientAuthorizationServService: ({payload}) => axios.post(`/authorizationservice/authorization/${payload.id}/fundingService/${payload.funderId}`, payload.body),

    editClientAuthorizationServService: ({payload}) =>  axios.patch(`/authorizationservice/${payload.id}`, payload.body),

    deleteClientAuthorizationServService: ({payload}) =>  axios.delete(`/authorizationservice/${payload.id}`),

    getClientHistoriesService: (id,onModal) => axios.get(`/history/${id}/${onModal}`,),

    getClientNotesService: (id,onModal) => axios.get(`/comment/${id}/${onModal}`,),

    createClientNoteService: ( body) => axios.post(`/comment`, body),

    editClientNoteService: (id, body) => axios.patch(`/comment/${id}`, body),

    deleteClientNoteService: (id) => axios.delete(`/comment/${id}/comments`,),



};


