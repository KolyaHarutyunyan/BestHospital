import axios from "axios";

export const claimService = {
   getClaimsService: (data) => {
      if (data) {
         return axios.get(`/claim/?limit=${data.limit}&&skip=${data.skip}`, {
            auth: true,
         });
      }
      return axios.get("/claim", { auth: true });
   },

   getClaimByIdService: (id) => axios.get(`/claim/${id}`, { auth: true }),

   generateClaimService: (group, body) =>
      axios.post(`/claim/generate?group=${group}`, body, { auth: true }),

   closeClaimService: (id, details) =>
      axios.post(`/claim/${id}/close?details=${details}`, {}, { auth: true }),
};
