import axios from "axios";

export const invoicePaymentService = {
   getInvoicePaymentsService: () => axios.get("/invoicePayment", { auth: true }),

   getInvoicePaymentByIdService: (id) =>
      axios.get(`/invoicePayment/${id}`, { auth: true }),

   createInvoicePaymentService: (body) =>
      axios.post("/invoicePayment", body, { auth: true }),

   editInvoicePaymentService: (id, body) =>
      axios.patch(`/invoicePayment/${id}`, body, { auth: true }),

   deleteInvoicePaymentService: (id) =>
      axios.delete(`/invoicePayment/${id}`, { auth: true }),

   editInvoicePaymentStatusService: (id, status, details) =>
      axios.patch(
         `/invoicePayment/${id}/setStatus?status=${status}?details=${details}`,
         {},
         { auth: true }
      ),
};
