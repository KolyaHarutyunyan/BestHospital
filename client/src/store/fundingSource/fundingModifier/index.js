import {
   createFundingModifier,
   editFundingModifier,
   deleteFundingModifier,
} from "./fundingModifier.action";

export { fundingModifierReducer } from "./fundingModifier.reducer";
export { watchFundingModifier } from "./fundingModifier.saga";

export const fundingModifierActions = {
   createFundingModifier,
   editFundingModifier,
   deleteFundingModifier,
};
