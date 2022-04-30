import axios from "axios";

export const claimPaymentService = {
   getClaimPaymentsService: () => axios.get("/claimPayment"),

   getClaimPaymentByIdService: (id) => axios.get(`/claimPayment/${id}`),

   createClaimPaymentService: (body) => axios.post("/claimPayment", body, { auth: true }),

   editClaimPaymentService: (id, body) => axios.patch(`/claimPayment/${id}`, body),

   deleteClaimPaymentService: (id) => axios.delete(`/claimPayment/${id}`),

   editClaimPaymentStatusService: (id, status, details) =>
      axios.patch(
         `/claimPayment/${id}/setStatus?status=${status}?details=${details}`,
         {},
         { auth: true }
      ),
};
