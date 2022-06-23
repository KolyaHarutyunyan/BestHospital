import axios from "axios";

export const systemService = {
   /** Credential */
   createCredentialGlobalService: (body) =>
      axios.post(`/credential`, body, { auth: true }),

   getCredentialGlobalService: () => axios.get(`/credential`, { auth: true }),

   editCredentialByIdGlobalService: (id, body) =>
      axios.patch(`/credential/${id}`, body, { auth: true }),

   deleteCredentialByIdService: (id) => axios.delete(`/credential/${id}`, { auth: true }),
   /** End */

   /** Service */
   createServiceGlobalService: (body) => axios.post(`/service`, body, { auth: true }),

   getServicesService: (data) =>
      axios.get(`/service`, { auth: true, params: { ...data } }),

   editServiceByIdGlobalService: (id, body) =>
      axios.patch(`/service/${id}`, body, { auth: true }),

   deleteServiceByIdService: (id) => axios.delete(`/service/${id}`, { auth: true }),
   /** End */

   /** Department */
   createDepartmentGlobalService: (body) =>
      axios.post(`/department`, body, { auth: true }),

   getDepartmentsService: () => axios.get(`/department`, { auth: true }),

   editDepartmentByIdGlobalService: (id, body) =>
      axios.patch(`/department/${id}`, body, { auth: true }),

   deleteDepartmentByIdService: (id) => axios.delete(`/department/${id}`, { auth: true }),
   /** End */

   /** Job */
   createJobGlobalService: (body) => axios.post(`/job`, body, { auth: true }),

   getJobsService: () => axios.get(`/job`, { auth: true }),

   editJobByIdGlobalService: (id, body) =>
      axios.patch(`/job/${id}`, body, { auth: true }),

   deleteJobByIdService: (id) => axios.delete(`/job/${id}`, { auth: true }),
   /** End */

   /** Departments */
   createPlaceGlobalService: (body) => axios.post(`/place`, body, { auth: true }),

   getPlacesService: () => axios.get(`/place`, { auth: true }),

   editPlaceByIdGlobalService: (id, body) =>
      axios.patch(`/place/${id}`, body, { auth: true }),

   deletePlaceByIdService: (id) => axios.delete(`/place/${id}`, { auth: true }),
   /** End */
};
