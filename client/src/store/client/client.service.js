import axios from "axios";

export const authService = {
    getClientsService: () => axios.get(`/client`,),
};
