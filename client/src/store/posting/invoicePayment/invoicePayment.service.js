import axios from "axios";

export const invoicePaymentService = {
   getInvoicePaymentsService: () => axios.get("/invoice-pmt", { auth: true }),

   getInvoicePaymentByIdService: (id) => axios.get(`/invoice-pmt/${id}`, { auth: true }),

   createInvoicePaymentService: (body) =>
      axios.post("/invoice-pmt", body, { auth: true }),

   editInvoicePaymentService: (id, body) =>
      axios.patch(`/invoice-pmt/${id}`, body, { auth: true }),

   deleteInvoicePaymentService: (id) =>
      axios.delete(`/invoice-pmt/${id}`, { auth: true }),

   editInvoicePaymentStatusService: (id, status, details) =>
      axios.patch(
         `/invoice-pmt/${id}/setStatus?status=${status}?details=${details}`,
         {},
         { auth: true }
      ),

   addInvoiceInInvoicePaymentService: (id, body) =>
      axios.post(`/invoice-pmt/${id}/payment`, body, { auth: true }),
};
