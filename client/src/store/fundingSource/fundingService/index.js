import {
   createFundingService,
   getFundingServices,
   getFundingServiceById,
   editFundingService,
} from "./fundingService.action";

export { fundingServiceReducer } from "./fundingService.reducer";
export { watchFundingService } from "./fundingService.saga";

export const fundingServiceActions = {
   createFundingService,
   getFundingServices,
   getFundingServiceById,
   editFundingService,
};
