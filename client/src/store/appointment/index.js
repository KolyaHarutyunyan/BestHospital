import {
    getGlobalNotes,
    createGlobalNote,
    editGlobalNote,
    deleteGlobalNote,
    createAppointment,
    editAppointment,
    getAppointment,
    getAppointmentById,
    deleteAppointment,
    searchAppointmentDate, getAppointmentFiltered, setAppointmentStatus, appointmentRepeat
} from "./appointment.action";
import {CREATE_APPOINTMENT, EDIT_APPOINTMENT} from "./appointment.type";

export {appointmentReducer} from './appointment.reducer';
export {watchAppointments} from './appointment.saga';

export const appointmentActions = {
    /** Create, Edit Appointment */
    createAppointment,
    editAppointment,
    /** end */

    /** Get Appointment */
    getAppointment,
    getAppointmentFiltered,
    getAppointmentById,
    /** end */

    /** Delete Appointment */
    deleteAppointment,
    /** end */

    /** Filter Appointment Date*/
    searchAppointmentDate,
    /** end */

    /** Appointment Status */
    setAppointmentStatus,
    /** end */

    /** Appointment Repeat */
    appointmentRepeat
    /** end */
}