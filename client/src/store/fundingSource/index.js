import {
    createFundingSource,
    getFundingSource,
    getFundingSourceById,
    getFoundingSourceServiceById,
    createFoundingSourceServiceById,
    getFundingSourceHistoriesById,
    getFundingSourceServ,
    createFundingSourceServ,
    getFundingSourceServById,
    createFoundingSourceServiceModifier,
    editFundingSource,
    editFoundingSourceServiceById, getActiveOrInactive
} from "./fundingSource.action";

export {fundingSourceReducer} from './fundingSource.reducer';
export {watchFundingSource} from './fundingSource.saga';

export const fundingSourceActions = {
    createFundingSource,
    getFundingSource,
    getFundingSourceById,
    getFoundingSourceServiceById,
    createFoundingSourceServiceById,
    editFoundingSourceServiceById,
    getFundingSourceHistoriesById,
    getFundingSourceServ,
    getFundingSourceServById,
    createFundingSourceServ,
    createFoundingSourceServiceModifier,
    editFundingSource,


    getActiveOrInactive
}

