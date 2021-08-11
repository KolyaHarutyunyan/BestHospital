import axios from "axios";

export const authService = {
    getClientsService: () => axios.get(`/client`,),

    createClientService: ({payload}) => axios.post(`/client`, payload.body),

    deleteClientService: ({payload}) => axios.delete(`/client/${payload.id}`),
};
