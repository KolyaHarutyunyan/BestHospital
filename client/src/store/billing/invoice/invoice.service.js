import axios from "axios";

export const invoiceService = {
   getInvoicesService: (data) => {
      if (data) {
         return axios.get(`/invoice/?limit=${data.limit}&&skip=${data.skip}`, {
            auth: true,
         });
      }
      return axios.get("/invoice", { auth: true });
   },

   getInvoiceByIdService: (id) => axios.get(`/invoice/${id}`, { auth: true }),

   generateInvoiceService: (body) =>
      axios.post("/invoice/generate", body, { auth: true }),

   editInvoiceService: (id, body) => axios.patch(`/invoice/${id}`, body, { auth: true }),

   deleteInvoiceService: (id) => axios.delete(`/invoice/${id}`, { auth: true }),
};
