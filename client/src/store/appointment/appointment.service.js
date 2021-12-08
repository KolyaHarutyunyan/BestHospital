import axios from "axios";

export const appointmentService = {

    /** Create, Edit Appointment */
    createAppointmentService: (body) => axios.post(`/appointment`, body, {auth:true}),

    editAppointmentService: (body, id) => axios.patch(`/appointment/${id}`, body, {auth:true}),
    /** end */

    /** Get Appointment */
    getAppointmentService: ( ) => axios.get(`/appointment`, {auth:true}),

    getAppointmentFilterService: (body) => axios.get(`/appointment`, {  params: body.filterDate, auth:true }),

    getAppointmentByIdService: (id) => axios.get(`/appointment/${id}`, {auth:true}),
    /** end */

    /** Delete Appointment */
    deleteAppointmentService: (id) => axios.delete(`/appointment/${id}`, {auth:true}),
    /** end */

    /** Appointment Status */
    setAppointmentStatusService: (id, info) => axios.patch(`/appointment/${id}/setStatus`, null,{auth:true,  params: info }),
    /** end */

    /** Appointment Repeat */
    appointmentRepeatService: (id, body) => axios.post(`/appointment/repeat/${id}`, body, {auth:true}),
    /** end */

}