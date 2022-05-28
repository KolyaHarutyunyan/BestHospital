import axios from "axios";

export const authService = {
   createFundingSourceService: (body) => axios.post("/funding", body, { auth: true }),

   editFundingSourceService: (id, body) =>
      axios.patch(`/funding/${id}`, body, { auth: true }),

   getFundingSourceService: ({ data }) => {
      if (data) {
         return axios.get(
            `/funding/?skip=${data.start}&&limit=${data.end}&&status=${data.status}`,
            { auth: true }
         );
      } else {
         return axios.get("/funding", { auth: true });
      }
   },

   getFoundingSourceByIdService: (id) => axios.get(`/funding/${id}`, { auth: true }),

   getFoundingSourceServiceByIdService: (id) =>
      axios.get(`/funding/${id}/service`, { auth: true }),

   createFoundingSourceServiceByIdService: (id, body) =>
      axios.post(`/funding/${id}/service`, body, { auth: true }),

   editFoundingSourceServiceService: (id, body) =>
      axios.patch(`/funding/service/${id}`, body, { auth: true }),

   getFundingSourceHistoriesByIdService: (onModal, searchDate) => {
      if (searchDate) {
         return axios.get(`/history/${onModal}?start=${searchDate}`, { auth: true });
      } else {
         return axios.get(`/history/${onModal}`, { auth: true });
      }
   },

   setStatusService: (id, path, status, body) =>
      axios.patch(`/${path}/${id}/setStatus?status=${status}`, body, { auth: true }),

   createFundingModifierService: (fundingId, body) =>
      axios.post(`/funding/${fundingId}/modifiers`, body, { auth: true }),

   editFundingModifierService: (fundingId, serviceId, body) =>
      axios.patch(`/funding/${fundingId}/${serviceId}/modifiers`, body, { auth: true }),

   deleteFundingModifierService: (fundingId, serviceId, modifiersIds) =>
      axios.delete(`/funding/${fundingId}/${serviceId}/modifiers?ids=${modifiersIds}`, {
         auth: true,
      }),
};
