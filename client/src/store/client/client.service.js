import axios from "axios";

export const authService = {
    getClientsService: () => axios.get(`/client`,),

    createClientService: ({payload}) => axios.post(`/client`, payload.body),

    deleteClientService: ({payload}) => axios.delete(`/client/${payload.id}`),

    editClientService: ({payload}) => axios.patch(`/client/${payload.id}`, payload.body),

    getClientByIdService: ({payload}) => axios.get(`/client/${payload.id}`, ),

    //
};
