import {
  ACTIVATE_ADMIN,
  CREATE_ADMIN,
  FILTER_BY_FIRST_NAME,
  GET_ADMIN_BY_ID,
  GET_ADMIN_BY_ID_CLEAR,
  GET_ADMINS, INACTIVATE_ADMIN
} from "./admin.types";
import {ACTIVATE_OFFICE, INACTIVATE_OFFICE} from "../offices/offices.types";

export const createAdmin = (body) => {
  return {
    type: CREATE_ADMIN,
    payload: { body }
  }
}

export const getAdmins = () => {
  return {
    type: GET_ADMINS
  }
}

export const getAdminById = (adminId) => {
  return {
    type: GET_ADMIN_BY_ID,
    payload: { adminId }
  }
}

export const clearAdminById =( )=>{
  return{
   type:GET_ADMIN_BY_ID_CLEAR,
  }
}

export const filterAdmins = (data) =>{
  return{
    type: FILTER_BY_FIRST_NAME,
    payload: { data }
  }
}


export const activateAdmin = (id) =>{
  return{
    type: ACTIVATE_ADMIN,
    payload:{id}
  }
}

export const inactivateAdmin = (id) =>{
  return{
    type: INACTIVATE_ADMIN,
    payload:{id}
  }
}
