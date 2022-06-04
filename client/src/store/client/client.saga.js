import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./client.service";
import {
   CREATE_CLIENT,
   DELETE_CLIENT,
   EDIT_CLIENT,
   GET_CLIENT_BY_ID,
   GET_CLIENT_BY_ID_SUCCESS,
   GET_CLIENT_CONTACTS,
   GET_CLIENT_CONTACTS_SUCCESS,
   GET_CLIENT_ENROLLMENT,
   GET_CLIENT_ENROLLMENT_SUCCESS,
   GET_CLIENTS,
   GET_CLIENTS_SUCCESS,
   CREATE_CLIENT_CONTACT,
   EDIT_CLIENT_CONTACT,
   DELETE_CLIENT_CONTACT,
   GET_CLIENT_AUTHORIZATION,
   GET_CLIENT_AUTHORIZATION_SUCCESS,
   CREATE_CLIENT_ENROLLMENT,
   EDIT_CLIENT_ENROLLMENT,
   DELETE_CLIENT_ENROLLMENT,
   CREATE_CLIENT_AUTHORIZATION,
   DELETE_CLIENT_AUTHORIZATION,
   EDIT_CLIENT_AUTHORIZATION,
   GET_CLIENT_AUTHORIZATION_SERV_SUCCESS,
   GET_CLIENT_AUTHORIZATION_SERV,
   CREATE_CLIENT_AUTHORIZATION_SERV,
   EDIT_CLIENT_AUTHORIZATION_SERV,
   DELETE_CLIENT_AUTHORIZATION_SERV,
   GET_CLIENT_HISTORIES_SUCCESS,
   GET_CLIENT_HISTORIES,
   CREATE_CLIENT_CONTACT_SUCCESS,
   GET_CLIENT_AUTHORIZATION_SERV_ERROR,
   GET_CLIENT_AUTHORIZATION_ERROR,
   GET_CLIENT_AUTHORIZATION_MOD_CHECK,
   GET_CLIENT_AUTHORIZATION_FILE_SUCCESS,
   CREATE_CLIENT_AUTHORIZATION_FILE_SUCCESS,
   EDIT_CLIENT_AUTHORIZATION_FILE_SUCCESS,
   DELETE_CLIENT_AUTHORIZATION_FILE_SUCCESS,
   GET_CLIENT_AUTHORIZATION_FILE,
   CREATE_CLIENT_AUTHORIZATION_FILE,
   EDIT_CLIENT_AUTHORIZATION_FILE,
   DELETE_CLIENT_AUTHORIZATION_FILE,
   ADD_FILES_TO_CLIENT_AUTH,
} from "./client.types";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";
import { GET_AVAILABILITY_SCHEDULE_GLOBAL } from "../availabilitySchedule/availabilitySchedule.type";

function* getClients(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.getClientsService, action.payload);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENTS_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createClient(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.createClientService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENTS,
         payload: { status: "ACTIVE", start: 0, end: 10 },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteClient(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.deleteClientService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENTS,
         payload: { status: 1, start: 0, end: 10 },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClient(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.editClientService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_BY_ID_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getClientById(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.getClientByIdService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_BY_ID_SUCCESS,
         payload: res.data,
      });
      yield put({
         type: GET_AVAILABILITY_SCHEDULE_GLOBAL,
         payload: action.payload.id,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getClientContacts(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getClientContactsService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_CONTACTS_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createClientContact(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.createClientContactService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: CREATE_CLIENT_CONTACT_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClientContact(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.editClientContactService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_CONTACTS,
         payload: { id: action.payload.paramsId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteClientContact(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.deleteClientContactService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_CONTACTS,
         payload: { id: action.payload.paramsId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getClientEnrollment(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getClientEnrollmentService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_ENROLLMENT_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createClientEnrollment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.createClientEnrollmentService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_ENROLLMENT,
         payload: { id: action.payload.id },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClientEnrollment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.editClientEnrollmentService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_ENROLLMENT,
         payload: { id: action.payload.clientId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteClientEnrollment(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.deleteClientEnrollmentService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_ENROLLMENT,
         payload: { id: action.payload.clientId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getClientsAuthorizations(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(
         authService.getClientAuthorizationService,
         action.payload.id
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put({
         type: GET_CLIENT_AUTHORIZATION_ERROR,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createClientsAuthorizations(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.createClientAuthorizationService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION,
         payload: { id: action.payload.id },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClientAuthorizations(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.editClientAuthorizationService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION,
         payload: { id: action.payload.clientId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteClientAuthorizations(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.deleteClientAuthorizationService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION,
         payload: { id: action.payload.clientId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

// authorization file

function* getClientsAuthorizationFile(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(
         authService.getClientAuthorizationFileService,
         action.payload.id
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION_FILE_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createClientsAuthorizationFile(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.createClientAuthorizationFileService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: CREATE_CLIENT_AUTHORIZATION_FILE_SUCCESS,
         payload: { id: action.payload.id },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClientAuthorizationFile(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.editClientAuthorizationFileService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: EDIT_CLIENT_AUTHORIZATION_FILE_SUCCESS,
         payload: { id: action.payload.clientId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteClientAuthorizationFile(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(authService.deleteClientAuthorizationFileService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: DELETE_CLIENT_AUTHORIZATION_FILE_SUCCESS,
         payload: { id: action.payload.clientId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

// end

function* getClientsAuthorizationsServ(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   try {
      const res = yield call(authService.getClientAuthorizationServService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION_SERV_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createClientsAuthorizationsServ(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.createClientAuthorizationServService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION_SERV,
         payload: { id: action.payload.id },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getClientsAuthorizationsModCheck(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      yield call(authService.getClientAuthorizationServCheckModService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* editClientAuthorizationsServ(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.editClientAuthorizationServService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION_SERV,
         payload: { id: action.payload.authID },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* deleteClientAuthorizationsServ(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(authService.deleteClientAuthorizationServService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_AUTHORIZATION_SERV,
         payload: { id: action.payload.authID },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* getClientHistories(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         authService.getClientHistoriesService,
         action.payload.id,
         action.payload.onModal
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put({
         type: GET_CLIENT_HISTORIES_SUCCESS,
         payload: res.data,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* addFilesToClientAuth(action) {
   yield put(httpRequestsOnErrorsActions.removeError(action.type));
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
   try {
      const res = yield call(
         authService.addFilesToClientAuthService,
         action.payload.authId,
         action.payload.files
      );
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_CLIENT_BY_ID,
         payload: { id: res.data?.clientId },
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchClient = function* watchClientSaga() {
   yield takeLatest(GET_CLIENTS, getClients);
   yield takeLatest(CREATE_CLIENT, createClient);
   yield takeLatest(DELETE_CLIENT, deleteClient);
   yield takeLatest(EDIT_CLIENT, editClient);
   yield takeLatest(GET_CLIENT_BY_ID, getClientById);
   yield takeLatest(GET_CLIENT_CONTACTS, getClientContacts);
   yield takeLatest(CREATE_CLIENT_CONTACT, createClientContact);
   yield takeLatest(EDIT_CLIENT_CONTACT, editClientContact);
   yield takeLatest(DELETE_CLIENT_CONTACT, deleteClientContact);
   yield takeLatest(GET_CLIENT_ENROLLMENT, getClientEnrollment);
   yield takeLatest(CREATE_CLIENT_ENROLLMENT, createClientEnrollment);
   yield takeLatest(EDIT_CLIENT_ENROLLMENT, editClientEnrollment);
   yield takeLatest(DELETE_CLIENT_ENROLLMENT, deleteClientEnrollment);
   yield takeLatest(GET_CLIENT_AUTHORIZATION, getClientsAuthorizations);
   yield takeLatest(CREATE_CLIENT_AUTHORIZATION, createClientsAuthorizations);
   yield takeLatest(EDIT_CLIENT_AUTHORIZATION, editClientAuthorizations);
   yield takeLatest(DELETE_CLIENT_AUTHORIZATION, deleteClientAuthorizations);
   yield takeLatest(GET_CLIENT_AUTHORIZATION_SERV, getClientsAuthorizationsServ);
   yield takeLatest(CREATE_CLIENT_AUTHORIZATION_SERV, createClientsAuthorizationsServ);
   yield takeLatest(EDIT_CLIENT_AUTHORIZATION_SERV, editClientAuthorizationsServ);
   yield takeLatest(DELETE_CLIENT_AUTHORIZATION_SERV, deleteClientAuthorizationsServ);

   yield takeLatest(GET_CLIENT_AUTHORIZATION_FILE, getClientsAuthorizationFile);
   yield takeLatest(CREATE_CLIENT_AUTHORIZATION_FILE, createClientsAuthorizationFile);
   yield takeLatest(EDIT_CLIENT_AUTHORIZATION_FILE, editClientAuthorizationFile);
   yield takeLatest(DELETE_CLIENT_AUTHORIZATION_FILE, deleteClientAuthorizationFile);

   yield takeLatest(GET_CLIENT_HISTORIES, getClientHistories);
   yield takeLatest(GET_CLIENT_AUTHORIZATION_MOD_CHECK, getClientsAuthorizationsModCheck);

   yield takeLatest(ADD_FILES_TO_CLIENT_AUTH, addFilesToClientAuth);
};
