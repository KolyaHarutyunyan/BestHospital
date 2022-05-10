import axios from "axios";

export const claimPaymentService = {
   getClaimPaymentsService: () => axios.get("/claimPayment", { auth: true }),

   getClaimPaymentByIdService: (id) => axios.get(`/claimPayment/${id}`, { auth: true }),

   createClaimPaymentService: (body) => axios.post("/claimPayment", body, { auth: true }),

   editClaimPaymentService: (id, body) =>
      axios.patch(`/claimPayment/${id}`, body, { auth: true }),

   deleteClaimPaymentService: (id) => axios.delete(`/claimPayment/${id}`, { auth: true }),

   editClaimPaymentStatusService: (id, status, details) =>
      axios.patch(
         `/claimPayment/${id}/setStatus?status=${status}?details=${details}`,
         {},
         { auth: true }
      ),
};
