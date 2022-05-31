import axios from "axios";

export const claimPaymentService = {
   getClaimPaymentsService: (data) => {
      if (data) {
         return axios.get(`/claim-pmt/?limit=${data.limit}&&skip=${data.skip}`, {
            auth: true,
         });
      }
      return axios.get("/claim-pmt", { auth: true });
   },

   getClaimPaymentByIdService: (id) => axios.get(`/claim-pmt/${id}`, { auth: true }),

   createClaimPaymentService: (body) => axios.post("/claim-pmt", body, { auth: true }),

   editClaimPaymentService: (id, body) =>
      axios.patch(`/claim-pmt/${id}`, body, { auth: true }),

   deleteClaimPaymentService: (id) => axios.delete(`/claim-pmt/${id}`, { auth: true }),

   editClaimPaymentStatusService: (id, status, details) =>
      axios.patch(
         `/claim-pmt/${id}/setStatus?status=${status}?details=${details}`,
         {},
         { auth: true }
      ),

   addClaimInClaimPaymentService: (id, body) =>
      axios.post(`/claim-pmt/${id}/payment`, body, { auth: true }),

   appendFilesToClaimPaymentService: (id, body) =>
      axios.post(`/claim-pmt/${id}/documents`, body, { auth: true }),
};
