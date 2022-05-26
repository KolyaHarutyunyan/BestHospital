import axios from "axios";

export const fundingModifierService = {
   createFundingModifierService: (fundingId, body) =>
      axios.post(`/funding/${fundingId}/modifiers`, body, { auth: true }),

   editFundingModifierService: (fundingId, serviceId, body) =>
      axios.patch(`/funding/${fundingId}/${serviceId}/modifiers`, body, { auth: true }),

   deleteFundingModifierService: (fundingId, serviceId) =>
      axios.delete(`/funding/${fundingId}/${serviceId}/modifiers`, { auth: true }),
};
