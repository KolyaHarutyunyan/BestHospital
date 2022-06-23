import axios from "axios";

export const authService = {
   createAdminService: (body) => axios.post(`/staff`, body, { auth: true }),

   editAdminByIdService: (id, body) => axios.patch(`/staff/${id}`, body, { auth: true }),

   getAdminsService: (data) => axios.get("/staff", { auth: true, params: { ...data } }),

   getAdminByIdService: (id) => axios.get(`/staff/${id}`, { auth: true }),

   changeAdminStatusService: (id, status) =>
      axios.patch(`/staff/${id}/${status}`, null, { auth: true }),

   createCredentialService: (body) => axios.post(`/scredential`, body, { auth: true }),

   getCredentialService: (id) =>
      axios.get(`/scredential/staff/${id}/credential`, { auth: true }),

   editCredentialByIdService: (id, body) =>
      axios.patch(`/scredential/${id}`, body, { auth: true }),

   deleteCredentialByIdService: (id) =>
      axios.delete(`/scredential/${id}`, { auth: true }),

   getEmploymentService: (id) => axios.get(`/employment/staff/${id}`, { auth: true }),

   createEmploymentService: (body) => axios.post(`/employment`, body, { auth: true }),

   editEmploymentService: (body, id) =>
      axios.patch(`/employment/${id}`, body, { auth: true }),

   getPayCodeService: (id) => axios.get(`/paycode/employment/${id}`, { auth: true }),

   createPayCodeService: (body) => axios.post(`/paycode`, body, { auth: true }),

   editPayCodeService: (body, id) => axios.patch(`/paycode/${id}`, body, { auth: true }),

   terminatePaycodeService: (paycodeId) =>
      axios.patch(`/paycode/${paycodeId}/inActive`, null, { auth: true }),

   getStaffServService: (id) => axios.get(`/staff/${id}/service`, { auth: true }),

   createStaffServService: (id, serviceId) =>
      axios.post(`/staff/${id}/service/${serviceId}`, null, { auth: true }),

   deleteStaffServService: (id, serviceId) =>
      axios.delete(`/staff/${id}/service/${serviceId}`, { auth: true }),

   isClinicianService: (id, isClinical) =>
      axios.patch(`/staff/${id}/${isClinical}`, null, { auth: true }),

   getTimesheetService: (id) => axios.get(`/timesheet/staff/${id}`, { auth: true }),

   getTimesheetById: (id) => axios.get(`/timesheet/${id}`, { auth: true }),

   createTimesheetService: (body) => axios.post(`/timesheet`, body, { auth: true }),

   editTimesheetService: (body, id) =>
      axios.patch(`/timesheet/${id}`, body, { auth: true }),

   // editTimesheetService: (body) => axios.post(`/timesheet`, body),

   getAllPaycodesService: (id) => axios.get(`/paycode/staff/${id}`, { auth: true }),
};
