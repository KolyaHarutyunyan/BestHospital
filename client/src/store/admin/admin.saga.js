import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./admin.service";
import {
   CREATE_ADMIN,
   GET_ADMIN_BY_ID,
   GET_ADMIN_BY_ID_SUCCESS,
   GET_ADMINS,
   GET_ADMINS_SUCCESS,
   EDIT_ADMIN_BY_ID,
   EDIT_ADMIN_BY_ID_SUCCESS,
   CREATE_CREDENTIAL,
   CREATE_CREDENTIAL_SUCCESS,
   GET_CREDENTIAL,
   GET_CREDENTIAL_SUCCESS,
   EDIT_CREDENTIAL_BY_ID,
   DELETE_CREDENTIAL_BY_ID,
   GET_EMPLOYMENT,
   CREATE_EMPLOYMENT,
   GET_EMPLOYMENT_SUCCESS,
   GET_PAY_CODE_SUCCESS,
   GET_PAY_CODE,
   CREATE_PAY_CODE,
   EDIT_EMPLOYMENT,
   CREATE_STAFF_SERVICE,
   GET_STAFF_SERVICE_SUCCESS,
   GET_STAFF_SERVICE,
   DELETE_STAFF_SERVICE,
   GET_TIMESHEET_SUCCESS,
   GET_TIMESHEET,
   CREATE_TIMESHEET,
   GET_ALL_PAYCODES,
   GET_ALL_PAYCODES_SUCCESS,
   EDIT_TIMESHEET,
   GET_ALL_ADMINS_SUCCESS,
   GET_ALL_ADMINS,
   EDIT_PAY_CODE,
   IS_CLINICIAN,
   GET_TIMESHEET_BY_ID,
   GET_TIMESHEET_BY_ID_SUCCESS,
   GET_ALL_PAYCODES_FAIL,
} from "./admin.types";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";

function* createAdmin(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createAdminService, action.payload.body);
      yield put({
         type: GET_ADMINS,
         payload: { status: 1, start: 0, end: 10 },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAdmins(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getAdminsService, action.payload);
      yield put({
         type: GET_ADMINS_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAllAdmins(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getAdminsService, action.payload);
      yield put({
         type: GET_ALL_ADMINS_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAdminById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getAdminByIdService, action.payload.adminId);
      yield put({
         type: GET_ADMIN_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editAdminById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.editAdminByIdService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: EDIT_ADMIN_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createCredential(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.createCredentialService, action.payload.body);
      yield put({
         type: CREATE_CREDENTIAL_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getCredential(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.getCredentialService,
         action.payload.credentialId
      );
      yield put({
         type: GET_CREDENTIAL_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      if (err.data.message === "Staff Credential with this id was not found") {
         yield put({
            type: GET_CREDENTIAL_SUCCESS,
            payload: "",
         });
      }

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editCredentialById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editCredentialByIdService,
         action.payload.id,
         action.payload.body
      );
      yield put({
         type: GET_CREDENTIAL,
         payload: { credentialId: action.payload.credentialId },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteCredentialById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.deleteCredentialByIdService, action.payload.id);
      yield put({
         type: GET_CREDENTIAL,
         payload: { credentialId: action.payload.credentialId },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getEmployment(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getEmploymentService, action.payload.id);
      yield put({
         type: GET_EMPLOYMENT_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createEmployment(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createEmploymentService, action.payload.body);
      yield put({
         type: GET_EMPLOYMENT,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editEmployment(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editEmploymentService,
         action.payload.body,
         action.payload.id
      );
      yield put({
         type: GET_EMPLOYMENT,
         payload: { id: action.payload.staffId },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getPayCode(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getPayCodeService, action.payload.id);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_PAY_CODE_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_PAY_CODE_SUCCESS,
         payload: [],
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createPayCode(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createPayCodeService, action.payload.body);
      yield put({
         type: GET_PAY_CODE,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editPayCode(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editPayCodeService,
         action.payload.body,
         action.payload.payCodeId
      );
      yield put({
         type: GET_PAY_CODE,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getStaffService(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getStaffServService, action.payload.id);
      yield put({
         type: GET_STAFF_SERVICE_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_STAFF_SERVICE_SUCCESS,
         payload: [],
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createStaffService(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.createStaffServService,
         action.payload.id,
         action.payload.serviceId
      );
      yield put({
         type: GET_STAFF_SERVICE,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* delteStaffService(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.deleteStaffServService,
         action.payload.id,
         action.payload.serviceId
      );
      yield put({
         type: GET_STAFF_SERVICE,
         payload: { id: action.payload.id },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* isClinician(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.isClinicianService,
         action.payload.id,
         action.payload.isClinical
      );

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getTimesheet(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getTimesheetService, action.payload.id);
      yield put({
         type: GET_TIMESHEET_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_TIMESHEET_SUCCESS,
         payload: [],
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getTimesheetById(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getTimesheetById, action.payload.id);
      yield put({
         type: GET_TIMESHEET_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createTimesheet(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createTimesheetService, action.payload.body);
      yield put({
         type: GET_TIMESHEET,
         payload: { id: action.payload.body.staffId },
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editTimesheet(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(
         authService.editTimesheetService,
         action.payload.body,
         action.payload.id
      );
      const res = yield call(authService.getTimesheetById, action.payload.id);
      yield put({
         type: GET_TIMESHEET_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put({
         type: GET_TIMESHEET,
         payload: { id: action.payload.params },
      });

      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getAllPaycodes(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.getAllPaycodesService, action.payload.id);
      yield put({
         type: GET_ALL_PAYCODES_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put({
         type: GET_ALL_PAYCODES_FAIL,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchAdmin = function* watchAdminSaga() {
   yield takeLatest(CREATE_ADMIN, createAdmin);
   yield takeLatest(GET_ADMINS, getAdmins);
   yield takeLatest(GET_ADMIN_BY_ID, getAdminById);
   yield takeLatest(EDIT_ADMIN_BY_ID, editAdminById);
   yield takeLatest(CREATE_CREDENTIAL, createCredential);
   yield takeLatest(GET_CREDENTIAL, getCredential);
   yield takeLatest(EDIT_CREDENTIAL_BY_ID, editCredentialById);
   yield takeLatest(DELETE_CREDENTIAL_BY_ID, deleteCredentialById);
   yield takeLatest(GET_EMPLOYMENT, getEmployment);
   yield takeLatest(CREATE_EMPLOYMENT, createEmployment);
   yield takeLatest(EDIT_EMPLOYMENT, editEmployment);
   yield takeLatest(GET_PAY_CODE, getPayCode);
   yield takeLatest(CREATE_PAY_CODE, createPayCode);
   yield takeLatest(EDIT_PAY_CODE, editPayCode);
   yield takeLatest(GET_STAFF_SERVICE, getStaffService);
   yield takeLatest(CREATE_STAFF_SERVICE, createStaffService);
   yield takeLatest(DELETE_STAFF_SERVICE, delteStaffService);
   yield takeLatest(IS_CLINICIAN, isClinician);
   yield takeLatest(GET_TIMESHEET, getTimesheet);
   yield takeLatest(GET_TIMESHEET_BY_ID, getTimesheetById);
   yield takeLatest(CREATE_TIMESHEET, createTimesheet);
   yield takeLatest(EDIT_TIMESHEET, editTimesheet);
   yield takeLatest(GET_ALL_PAYCODES, getAllPaycodes);
   yield takeLatest(GET_ALL_ADMINS, getAllAdmins);
};
