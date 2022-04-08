import axios from "axios";

export const claimService = {
   getClaimsService: () => axios.get("/claim", { auth: true }),

   getClaimByIdService: (id) => axios.get(`/claim/${id}`, { auth: true }),

   generateClaimService: (group, body) =>
      axios.post(`/claim/generate?group=${group}`, body, { auth: true }),

   editClaimStatusService: (id, status, details) =>
      axios.patch(
         `/claim/${id}/setStatus?status=${status}?details=${details}`,
         {},
         { auth: true }
      ),
};
