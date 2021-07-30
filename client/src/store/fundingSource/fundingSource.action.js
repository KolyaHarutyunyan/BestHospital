import {CREATE_FUNDING_SOURCE, GET_FUNDING_SOURCE} from "./fundingSource.types";

export const createFundingSource = (body) => {
  return {
    type: CREATE_FUNDING_SOURCE,
    payload: { body }
  }
}

export const getFundingSource = () => {
  return {
    type: GET_FUNDING_SOURCE
  }
}
