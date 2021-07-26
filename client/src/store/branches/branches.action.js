import {CREATE_BRANCH, GET_BRANCHES} from "./branches.types";

export const createBranch = (body) => {
  return {
    type: CREATE_BRANCH,
    payload: { body }
  }
}

export const getBranches = () => {
  return {
    type: GET_BRANCHES
  }
}
