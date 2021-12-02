import axios from "axios";

export const appointmentService = {

    /** Create, Edit Appointment */
    createAppointmentService: (body) => axios.post(`/appointment`, body),

    editAppointmentService: (body, id) => axios.patch(`/appointment/${id}`, body),
    /** end */

    /** Get Appointment */
    getAppointmentService: ( ) => axios.get(`/appointment`),

    getAppointmentFilterService: (body) => axios.get(`/appointment`, {  params: body.filterDate }),

    getAppointmentByIdService: (id) => axios.get(`/appointment/${id}`),
    /** end */

    /** Delete Appointment */
    deleteAppointmentService: (id) => axios.delete(`/appointment/${id}`),
    /** end */

    /** Appointment Status */
    setAppointmentStatusService: (id, info) => axios.patch(`/appointment/${id}/setStatus`, null,{  params: info }),
    /** end */

    /** Appointment Repeat */
    appointmentRepeatService: (id, body) => axios.post(`/appointment/repeat/${id}`, body),
    /** end */

}