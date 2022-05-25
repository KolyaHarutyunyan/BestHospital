import axios from "axios";

export const fundingServiceService = {
   createFundingServiceService: (fundingId, body) =>
      axios.post(`/funding/${fundingId}/service`, body, { auth: true }),

   editFundingServiceService: (serviceId, body) =>
      axios.patch(`/funding/service/${serviceId}`, body, { auth: true }),

   getFundingServicesService: (fundingId) =>
      axios.get(`/funding/${fundingId}/service`, { auth: true }),

   getFundingServiceByIdService: (serviceId) =>
      axios.get(`/funding/service/${serviceId}`, { auth: true }),
};
