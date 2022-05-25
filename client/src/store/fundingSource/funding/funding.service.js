import axios from "axios";

export const fundingService = {
   createFundingSourceService: (body) => axios.post("/funding", body, { auth: true }),

   editFundingSourceService: (id, body) =>
      axios.patch(`/funding/${id}`, body, { auth: true }),

   getFundingSourcesService: (data) => {
      if (data) {
         return axios.get(
            `/funding/?skip=${data.start}&&limit=${data.end}&&status=${data.status}`,
            { auth: true }
         );
      } else {
         return axios.get("/funding", { auth: true });
      }
   },

   getFundingSourceByIdService: (id) => axios.get(`/funding/${id}`, { auth: true }),

   deleteFundingSourceService: (id) => axios.delete(`/funding/${id}`, { auth: true }),

   changeFundingSourceStatusService: (id, status, reason) =>
      axios.patch(`/funding/${id}/setStatus?status=${status}`, reason, { auth: true }),
};
