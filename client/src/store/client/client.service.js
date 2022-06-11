import axios from "axios";

export const authService = {
   getClientsService: ({ data }) => {
      if (data) {
         return axios.get(
            `/client/?skip=${data.start}&&limit=${data.end}&&status=${data.status}`,
            { auth: true }
         );
      } else {
         return axios.get("/client", { auth: true });
      }
   },

   createClientService: ({ payload }) =>
      axios.post(`/client`, payload.body, { auth: true }),

   deleteClientService: ({ payload }) =>
      axios.delete(`/client/${payload.id}`, { auth: true }),

   editClientService: ({ payload }) =>
      axios.patch(`/client/${payload.id}`, payload.body, { auth: true }),

   getClientByIdService: ({ payload }) =>
      axios.get(`/client/${payload.id}`, { auth: true }),

   getClientContactsService: ({ payload }) =>
      axios.get(`/contact/client/${payload.id}`, { auth: true }),

   createClientContactService: ({ payload }) =>
      axios.post(`/contact/client/${payload.id}`, payload.body, { auth: true }),

   editClientContactService: ({ payload }) =>
      axios.patch(`/contact/${payload.id}`, payload.body, { auth: true }),

   deleteClientContactService: ({ payload }) =>
      axios.delete(`/contact/${payload.id}`, { auth: true }),

   getClientEnrollmentService: ({ payload }) =>
      axios.get(`/enrollment/client/${payload.id}`, { auth: true }),

   createClientEnrollmentService: ({ payload }) =>
      axios.post(
         `/enrollment/client/${payload.id}/funder/${payload.funderId}`,
         payload.body,
         { auth: true }
      ),

   editClientEnrollmentService: ({ payload }) =>
      axios.patch(
         `/enrollment/${payload.id}/client/${payload.clientId}/funder/${payload.funderId}`,
         payload.body,
         { auth: true }
      ),

   terminateClientEnrollmentService: ({ payload }) =>
      axios.patch(`/enrollment/${payload.enrollmentId}/terminate`, null, { auth: true }),

   deleteClientEnrollmentService: ({ payload }) =>
      axios.delete(`/enrollment/${payload.id}`, { auth: true }),

   getClientAuthorizationService: (id) => axios.get(`/auth/client/${id}`, { auth: true }),

   createClientAuthorizationService: ({ payload }) =>
      axios.post(`/auth/client/${payload.id}/funder/${payload.funderId}`, payload.body, {
         auth: true,
      }),

   editClientAuthorizationService: ({ payload }) =>
      axios.patch(`/auth/${payload.id}`, payload.body, { auth: true }),

   deleteClientAuthorizationService: ({ payload }) =>
      axios.delete(`/auth/${payload.id}`, { auth: true }),

   getClientAuthorizationServService: ({ payload }) =>
      axios.get(`/authservice/auth/${payload.id}`, { auth: true }),

   createClientAuthorizationServService: ({ payload }) =>
      axios.post(
         `/authservice/auth/${payload.id}/fundingService/${payload.funderId}`,
         payload.body,
         { auth: true }
      ),

   // Authorization file

   editClientAuthorizationFileService: ({ payload }) =>
      axios.patch(`/files/${payload.id}`, payload.body, { auth: true }),

   deleteClientAuthorizationFileService: ({ payload }) =>
      axios.delete(`/files/${payload.id}`, { auth: true }),

   getClientAuthorizationFileService: ({ payload }) =>
      axios.get(`/files/${payload.id}`, { auth: true }),

   createClientAuthorizationFileService: ({ payload }) =>
      axios.post(`/files/upload`, payload.body, { auth: true }),

   createClientAuthorizationRestFileService: ({ payload }) =>
      axios.post(`/files`, payload.body, { auth: true }),

   // end

   getClientAuthorizationServCheckModService: ({ payload }) =>
      axios.post(
         `/authservice/auth/${payload.id}/fundingService/${payload.funderId}`,
         payload.body,
         { auth: true }
      ),

   editClientAuthorizationServService: ({ payload }) =>
      axios.patch(`/authservice/${payload.id}`, payload.body, { auth: true }),

   deleteClientAuthorizationServService: ({ payload }) =>
      axios.delete(`/authservice/${payload.id}`, { auth: true }),

   getClientHistoriesService: (id, onModal) =>
      axios.get(`/history/${id}/${onModal}`, { auth: true }),

   addFilesToClientAuthService: (authId, files) =>
      axios.post(`/auth/${authId}/documents`, files, {
         auth: true,
      }),

   removeFilesFromClientAuthService: (authId, docId) =>
      axios.delete(`/auth/${authId}/documents/${docId}`, {
         auth: true,
      }),
};
