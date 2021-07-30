import {createFundingSource, getFundingSource,} from "./fundingSource.action";

export { fundingSourceReducer } from './fundingSource.reducer';
export { watchFundingSource } from './fundingSource.saga';

export const fundingSourceActions = {
  createFundingSource,
  getFundingSource
}

