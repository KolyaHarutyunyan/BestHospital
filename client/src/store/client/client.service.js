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

    getClientEnrollmentService: ({payload}) => axios.get(`/enrollment/client/${payload.id}`, ),


};
