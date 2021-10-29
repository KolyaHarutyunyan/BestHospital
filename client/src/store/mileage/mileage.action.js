import {
    CREATE_MILEAGE, DELETE_MILEAGE, EDIT_MILEAGE, GET_MILEAGES

} from "./milage.types";


                                           /** Mc Requests, here is All requests for Mileage page */

/** Create, Edit Mileage */

export const createMileage = ( body ) => {
  return {
    type: CREATE_MILEAGE,
    payload: { body }
  }
}

export const editMileage = (id, body ) => {
  return {
    type: EDIT_MILEAGE,
    payload: {id, body }
  }
}

/** End */

/** Get Mileages */

export const getMileages = ( ) => {
  return {
    type: GET_MILEAGES,
  }
}

/** End */

/** Delete Mileage */

export const deleteMileage = ( id ) =>{
  return{
    type: DELETE_MILEAGE,
    payload:{ id }
  }
}

/** End */