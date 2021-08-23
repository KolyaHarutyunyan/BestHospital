import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./client.service";
import {
    CREATE_CLIENT,
    DELETE_CLIENT,
    EDIT_CLIENT,
    GET_CLIENT_BY_ID,
    GET_CLIENT_BY_ID_SUCCESS,
    GET_CLIENT_CONTACTS,
    GET_CLIENT_CONTACTS_SUCCESS, GET_CLIENT_ENROLLMENT,
    GET_CLIENT_ENROLLMENT_SUCCESS,
    GET_CLIENTS,
    GET_CLIENTS_SUCCESS,
    CREATE_CLIENT_CONTACT, EDIT_CLIENT_CONTACT, DELETE_CLIENT_CONTACT
} from "./client.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {GET_FUNDING_SOURCE_BY_ID_SUCCESS} from "../fundingSource/fundingSource.types";



function* getClients() {
    try {
        const res = yield call(authService.getClientsService);
        yield put({
            type: GET_CLIENTS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err)
    }
}

function* createClient(action) {

    try {
        const res = yield call(authService.createClientService, action);
        window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error create client')
    }
}

function* deleteClient(action) {
    try {
        const res = yield call(authService.deleteClientService, action);
        window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error')
    }
}
function* editClient(action) {
    try {
        const res = yield call(authService.editClientService, action);
        window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error')
    }
}

function* getClientById(action) {
    try {
        const res = yield call(authService.getClientByIdService, action);
        yield put({
            type: GET_CLIENT_BY_ID_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err, 'error')
    }
}

function* getClientContacts(action) {
    try {
        const res = yield call(authService.getClientContactsService, action);
        yield put({
            type: GET_CLIENT_CONTACTS_SUCCESS,
            payload: res.data,
        });
    } catch (err) {

    }
}

function* createClientContact(action) {
    try {
        const res = yield call(authService.createClientContactService, action);
        console.log(res,'reessss')
          // window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error add client')
    }
}

function* editClientContact(action) {
    try {
        const res = yield call(authService.editClientContactService, action);
         window.location.replace(`/client/`)
    } catch (err) {
        console.log(err, 'error edit client')
    }
}


function* deleteClientContact(action) {
    try {
        const res = yield call(authService.deleteClientContactService, action);
        console.log(res,'resss delete contact')
        // window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error edit client')
    }
}


function* getClientEnrollment(action) {
    try {
        const res = yield call(authService.getClientEnrollmentService, action);
        yield put({
            type: GET_CLIENT_ENROLLMENT_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err, 'error get en roll')
    }
}





export const watchClient = function* watchClientSaga() {

    yield takeLatest(GET_CLIENTS, getClients)
    yield takeLatest(CREATE_CLIENT, createClient)
    yield takeLatest(DELETE_CLIENT, deleteClient)
    yield takeLatest(EDIT_CLIENT, editClient)
    yield takeLatest(GET_CLIENT_BY_ID, getClientById)
    yield takeLatest(GET_CLIENT_CONTACTS, getClientContacts)
    yield takeLatest(CREATE_CLIENT_CONTACT, createClientContact)
    yield takeLatest(EDIT_CLIENT_CONTACT, editClientContact)
    yield takeLatest(DELETE_CLIENT_CONTACT, deleteClientContact)
    yield takeLatest(GET_CLIENT_ENROLLMENT, getClientEnrollment)


};
