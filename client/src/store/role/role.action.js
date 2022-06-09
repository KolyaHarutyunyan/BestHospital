import {
   CREATE_ROLE,
   GET_ROLE,
   GET_ROLE_BY_ID,
   SEARCH_ROLE,
   OPEN_ROLE,
   DELETE_ROLE,
   ADD_ROLE_PERMISSION,
   DELETE_ROLE_PERMISSION,
   REMOVE_ROLE,
} from "./role.types";

export const createRole = (body) => {
   return {
      type: CREATE_ROLE,
      payload: { body },
   };
};

export const getRole = (data) => {
   return {
      type: GET_ROLE,
      payload: { data },
   };
};

export const deleteRole = (id) => {
   return {
      type: DELETE_ROLE,
      payload: { id },
   };
};

export const getRoleById = (id) => {
   return {
      type: GET_ROLE_BY_ID,
      payload: { id },
   };
};

export const searchRoles = (name) => {
   return {
      type: SEARCH_ROLE,
      payload: { name },
   };
};

export const openRole = (role) => {
   return {
      type: OPEN_ROLE,
      payload: { role },
   };
};
export const removeRole = () => {
   return {
      type: REMOVE_ROLE,
   };
};

export const addRolePermission = (body) => {
   return {
      type: ADD_ROLE_PERMISSION,
      payload: { body },
   };
};

export const deleteRolePermission = (data) => {
   return {
      type: DELETE_ROLE_PERMISSION,
      payload: { data },
   };
};
