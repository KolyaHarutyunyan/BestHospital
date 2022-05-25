import {
   createFundingSource,
   getFundingSources,
   getFundingSourceById,
   editFundingSource,
   deleteFundingSource,
   changeFundingSourceStatus,
} from "./funding.action";

export { fundingReducer } from "./funding.reducer";
export { watchFunding } from "./funding.saga";

export const fundingActions = {
   createFundingSource,
   getFundingSources,
   getFundingSourceById,
   editFundingSource,
   deleteFundingSource,
   changeFundingSourceStatus,
};
