import axios from "axios";

export const systemService = {

    createCredentialGlobalService: (body) => axios.post(`/credential`, body),

    getCredentialService: () => axios.get(`/credential`),

    editCredentialByIdGlobalService: (id, body) => axios.patch(`/credential/${id}`, body),

};