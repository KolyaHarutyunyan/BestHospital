import { fork } from "redux-saga/effects";
import { watchAuth } from "../auth";
import { watchPermission } from "../permissions";
import { watchOffice } from "../offices";
import { watchRole } from "../role";
import { watchAdmin } from "../admin";
import { watchFundingSource } from "../fundingSource";
import { watchAgent } from "../agents";
import { watchClient } from "../client";
import { watchSystem } from "../system";
import { watchNotes } from "../notes";
import { watchPayroll } from "../payroll";
import { watchAvailabilitySchedule } from "../availabilitySchedule";
import { watchMileage } from "../mileage";
import { watchAppointments } from "../appointment";
import { watchBill, watchClaim, watchInvoice } from "../billing";
import { watchClaimPayment, watchInvoicePayment } from "../posting";

/** Combined Sagas */
export const appSaga = function* startForman() {
   yield fork(watchAuth);
   yield fork(watchAdmin);
   yield fork(watchRole);
   yield fork(watchOffice);
   yield fork(watchPermission);
   yield fork(watchFundingSource);
   yield fork(watchAgent);
   yield fork(watchClient);
   yield fork(watchSystem);
   yield fork(watchNotes);
   yield fork(watchPayroll);
   yield fork(watchAvailabilitySchedule);
   yield fork(watchMileage);
   yield fork(watchAppointments);
   yield fork(watchBill);
   yield fork(watchClaim);
   yield fork(watchInvoice);
   yield fork(watchClaimPayment);
   yield fork(watchInvoicePayment);
};
