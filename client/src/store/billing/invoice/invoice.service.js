import axios from "axios";

export const invoiceService = {
   getInvoicesService: () => axios.get("/invoice", { auth: true }),

   getInvoiceByIdService: (id) => axios.get(`/invoice/${id}`, { auth: true }),

   generateInvoiceService: (body) => axios.post("/invoice/generate", body, { auth: true }),

   editInvoiceService: (id, body) => axios.patch(`/invoice/${id}`, body, { auth: true }),

   deleteInvoiceService: (id) => axios.delete(`/invoice/${id}`, { auth: true }),
};
