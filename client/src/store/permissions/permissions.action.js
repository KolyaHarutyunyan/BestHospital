import {CREATE_PERMISSION, DELETE_PERMISSION, GET_PERMISSIONS, OPEN_ROLE} from "./permissions.types";
import {SEARCH_ROLE} from "../role/role.types";

export const createPermission = (body) => {
  return {
    type: CREATE_PERMISSION,
    payload: { body }
  }
}

export const getPermissions = () => {
  return {
    type: GET_PERMISSIONS
  }
}

export const deletePermission = (id) => {
  return {
    type: DELETE_PERMISSION,
    payload: { id }
  }
}
