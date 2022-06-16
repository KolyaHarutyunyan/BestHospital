import {
   createFundingSource,
   getFundingSource,
   getFundingSourceById,
   getFoundingSourceServiceById,
   createFoundingSourceServiceById,
   editFundingSource,
   editFoundingSourceServiceById,
   deleteFoundingSourceServiceById,
   setStatus,
   createFundingModifier,
   editFundingModifier,
   changeFundingModifierStatus,
   changeFundingSourceStatus,
} from "./fundingSource.action";

export { fundingSourceReducer } from "./fundingSource.reducer";
export { watchFundingSource } from "./fundingSource.saga";

export const fundingSourceActions = {
   createFundingSource,
   getFundingSource,
   getFundingSourceById,
   getFoundingSourceServiceById,
   createFoundingSourceServiceById,
   editFoundingSourceServiceById,
   editFundingSource,
   deleteFoundingSourceServiceById,
   setStatus,
   createFundingModifier,
   editFundingModifier,
   changeFundingModifierStatus,
   changeFundingSourceStatus,
};
