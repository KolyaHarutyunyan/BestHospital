import axios from "axios";

export const claimService = {
   getClaimsService: () => axios.get("/claim", { auth: true }),

   getClaimByIdService: (id) => axios.get(`/claim/${id}`, { auth: true }),

   generateClaimService: (body) => axios.post("/claim/generate", body, { auth: true }),

   editClaimStatusService: (id, status) =>
      axios.patch(`/claim/${id}/setStatus?status=${status}`, {}, { auth: true }),
};
