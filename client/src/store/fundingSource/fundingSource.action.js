import {CREATE_FUNDING_SOURCE, GET_FUNDING_SOURCE, GET_FUNDING_SOURCE_BY_ID} from "./fundingSource.types";

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

export const getFundingSourceById = (id) => {
  console.log(id,'act-id')
  return {
    type: GET_FUNDING_SOURCE_BY_ID,
    payload : id
  }
}
