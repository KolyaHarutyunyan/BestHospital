import axios from "axios";


export const authService = {
    // getClientsService: () => axios.get(`/client`,),

    getClientsService: ({data}) => {

        if (data) {
            return axios.get(`/client/?skip=${data.start}&&limit=${data.end}&&status=${data.status}`)
        } else {
            return axios.get('/client')
        }
    },

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

    getClientAuthorizationService: (id) => axios.get(`/authorization/client/${id}` ),

    createClientAuthorizationService: ({payload}) => axios.post(`/authorization/client/${payload.id}/funder/${payload.funderId}`, payload.body),

    editClientAuthorizationService: ({payload}) =>  axios.patch(`/authorization/${payload.id}`, payload.body),

    deleteClientAuthorizationService: ({payload}) =>  axios.delete(`/authorization/${payload.id}`),

    getClientAuthorizationServService: ({payload}) => axios.get(`/authorizationservice/authorization/${payload.id}` ),

    createClientAuthorizationServService: ({payload}) => axios.post(`/authorizationservice/authorization/${payload.id}/fundingService/${payload.funderId}`, payload.body),


    // Authorization file

    editClientAuthorizationFileService: ({payload}) =>  axios.patch(`/files/${payload.id}`, payload.body),

    deleteClientAuthorizationFileService: ({payload}) =>  axios.delete(`/files/${payload.id}`),

    getClientAuthorizationFileService: ({payload}) => axios.get(`/files/${payload.id}` ),

    createClientAuthorizationFileService: ({payload}) => axios.post(`/files/upload`,payload.body),

    createClientAuthorizationRestFileService: ({payload}) => axios.post(`/files`,payload.body),

    // end


    getClientAuthorizationServCheckModService: ({payload}) => axios.post(`/authorizationservice/authorization/${payload.id}/fundingService/${payload.funderId}/checkModifiers`,payload.body),

    editClientAuthorizationServService: ({payload}) =>  axios.patch(`/authorizationservice/${payload.id}`, payload.body),

    deleteClientAuthorizationServService: ({payload}) =>  axios.delete(`/authorizationservice/${payload.id}`),

    getClientHistoriesService: (id,onModal) => axios.get(`/history/${id}/${onModal}`),

};


