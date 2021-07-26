import {CLEAR_OFFICE_BY_ID, CREATE_OFFICE, GET_OFFICE_BY_ID, GET_OFFICES, EDIT_OFFICE, ACTIVATE_OFFICE, INACTIVATE_OFFICE} from "./offices.types";

export const createOffice = (body) => {
  return {
    type: CREATE_OFFICE,
    payload: { body }
  }
}

export const editOffice = (body) => {
  return {
    type: EDIT_OFFICE,
    payload: { body }
  }
}

export const getOffices = () => {
  return {
    type: GET_OFFICES
  }
}

export const getOfficeById =(id)=>{
  return{
    type: GET_OFFICE_BY_ID,
    payload: { id }
  }
}

export const clearOfficeById =(id)=>{
  return{
    type: CLEAR_OFFICE_BY_ID,
    payload: { id }
  }
}


export const activateOffice = (id) =>{
  return{
    type: ACTIVATE_OFFICE,
    payload:{id}
  }
}

export const inactivateOffice = (id) =>{
  return{
    type: INACTIVATE_OFFICE,
    payload:{id}
  }
}
