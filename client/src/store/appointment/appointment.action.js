import {
    APPOINTMENT_REPEAT,
    CREATE_APPOINTMENT,
    DELETE_APPOINTMENT,
    EDIT_APPOINTMENT,
    FILTER_APPOINTMENT_DATE,
    GET_APPOINTMENT,
    GET_APPOINTMENT_BY_ID,
    GET_APPOINTMENT_FILTERED,
    SET_APPOINTMENT_STATUS,
} from "./appointment.type";

/** Create, Edit Appointment */

export const createAppointment = (body) => {
    return {
        type: CREATE_APPOINTMENT,
        payload: {body}
    }
}

export const editAppointment = (body, id) => {
    return {
        type: EDIT_APPOINTMENT,
        payload: {body, id}
    }
}

/** end */

/** Get Appointment */

export const getAppointment = () => {
    return {
        type: GET_APPOINTMENT,
    }
}
export const getAppointmentFiltered = (filterDate) => {
    return {
        type: GET_APPOINTMENT_FILTERED,
        payload: {filterDate}
    }
}

export const getAppointmentById = (id) => {
    return {
        type: GET_APPOINTMENT_BY_ID,
        payload: {id}
    }
}

/** end */

/** Delete Appointment */

export const deleteAppointment = (id) => {
    return {
        type: DELETE_APPOINTMENT,
        payload: {id}
    }
}

/** end */

/** Filter Appointment Date*/

export const searchAppointmentDate = (date) => {
    return {
        type: FILTER_APPOINTMENT_DATE,
        payload: {date}
    }
}

/** end */

/** Appointment Status */

export const setAppointmentStatus = (id, info) => {
    return {
        type: SET_APPOINTMENT_STATUS,
        payload: {id, info}
    }
}

/** end */

/** Appointment Repeat */

export const appointmentRepeat = ( id, body ) =>{
    return{
        type:APPOINTMENT_REPEAT,
        payload: { id, body }
    }
}

/** end */