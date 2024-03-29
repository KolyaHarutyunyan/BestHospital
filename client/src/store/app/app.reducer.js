import { combineReducers } from "redux";
import { authReducer } from "../auth";
import { adminReducer } from "../admin";
import { systemReducer } from "../system";
import { noteReducer } from "../notes";
import { payrollReducer } from "../payroll";
import { officeReducer } from "../offices";
import { permissionsReducer } from "../permissions";
import { roleReducer } from "../role";
import { fundingSourceReducer } from "../fundingSource";
import { clientReducer } from "../client";
import { agentReducer } from "../agents";
import { httpRequestsOnLoadReducer } from "../http_requests_on_load";
import { httpRequestsOnSuccessReducer } from "../http_requests_on_success";
import { httpRequestsOnErrorsReducer } from "../http_requests_on_errors";
import { availabilityScheduleReducer } from "../availabilitySchedule";
import { mileageReducer } from "../mileage";
import { appointmentReducer } from "../appointment";
import { billReducer, claimReducer, invoiceReducer } from "../billing";
import { claimPaymentReducer, invoicePaymentReducer } from "../posting";
import { historyReducer } from "../history";

const initialState = {
   isLoading: false,
   error: false,
};

const globalReducer = (state = initialState, action) => {
   switch (action.type) {
      default:
         return state;
   }
};

export const appReducer = combineReducers({
   auth: authReducer,
   global: globalReducer,
   admins: adminReducer,
   offices: officeReducer,
   permissions: permissionsReducer,
   roles: roleReducer,
   fundingSource: fundingSourceReducer,
   agents: agentReducer,
   client: clientReducer,
   system: systemReducer,
   note: noteReducer,
   payroll: payrollReducer,
   availabilitySchedule: availabilityScheduleReducer,
   mileage: mileageReducer,
   appointment: appointmentReducer,
   bill: billReducer,
   claim: claimReducer,
   invoice: invoiceReducer,
   claimPayment: claimPaymentReducer,
   invoicePayment: invoicePaymentReducer,
   history: historyReducer,

   httpOnLoad: httpRequestsOnLoadReducer,
   httpOnSuccess: httpRequestsOnSuccessReducer,
   httpOnError: httpRequestsOnErrorsReducer,
});
