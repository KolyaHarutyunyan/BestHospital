import axios from "axios";

export const appointmentService = {
   /** Create, Edit Appointment */
   createAppointmentService: (body) => axios.post(`/appt`, body, { auth: true }),

   editAppointmentService: (body, id) => axios.patch(`/appt/${id}`, body, { auth: true }),
   /** end */

   /** Get Appointment */
   getAppointmentService: () => axios.get(`/appt`, { auth: true }),

   getAppointmentFilterService: (body) =>
      axios.get(`/appt`, { params: body.filterDate, auth: true }),

   getAppointmentByIdService: (id) => axios.get(`/appt/${id}`, { auth: true }),
   /** end */

   /** Delete Appointment */
   deleteAppointmentService: (id) => axios.delete(`/appt/${id}`, { auth: true }),
   /** end */

   /** Appointment Status */
   setAppointmentStatusService: (id, statusName, reason) =>
      axios.patch(`/appt/${id}/${statusName}?reason=${reason}`, null, { auth: true }),
   /** end */

   /** Appointment Repeat */
   appointmentRepeatService: (id, body) =>
      axios.post(`/appt/repeat/${id}`, body, { auth: true }),
   /** end */
};
