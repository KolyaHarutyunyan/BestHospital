import axios from "axios";

export const invoicePaymentService = {
   getInvoicePaymentsService: () => axios.get("/posting"),

   getInvoicePaymentByIdService: (id) => axios.get(`/posting/${id}`),

   createInvoicePaymentService: (body) => axios.post("/posting", body, { auth: true }),

   editInvoicePaymentService: (id, body) => axios.patch(`/posting/${id}`, body),

   deleteInvoicePaymentService: (id) => axios.delete(`/posting/${id}`),

   editInvoicePaymentStatusService: (id, status, details) =>
      axios.patch(
         `/posting/${id}/setStatus?status=${status}?details=${details}`,
         {},
         { auth: true }
      ),
};
