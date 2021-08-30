import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./client.service";
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
    EDIT_CLIENT_AUTHORIZATION_SERV, DELETE_CLIENT_AUTHORIZATION_SERV
} from "./client.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {GET_FUNDING_SOURCE_BY_ID_SUCCESS} from "../fundingSource/fundingSource.types";



function* getClients() {

    try {
        const res = yield call(authService.getClientsService);
        console.log(res,'res clients')
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
           window.location.replace('/client')
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

         window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error del client')
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

function* createClientEnrollment(action) {
    try {
        const res = yield call(authService.createClientEnrollmentService, action);
        window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error create client')
    }
}

function* editClientEnrollment(action) {
    try {
        const res = yield call(authService.editClientEnrollmentService, action);
         window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error create client')
    }
}

function* deleteClientEnrollment(action) {
    try {
        const res = yield call(authService.deleteClientEnrollmentService, action);
         window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error del enroll')
    }
}

function* getClientsAuthorizations(action) {
    try {
        const res = yield call(authService.getClientAuthorizationService, action);
        yield put({
            type: GET_CLIENT_AUTHORIZATION_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err, 'authhhhhhhh get en roll')
    }
}

function* createClientsAuthorizations(action) {
    try {
        const res = yield call(authService.createClientAuthorizationService, action);
        // window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error create auth')
    }
}


function* editClientAuthorizations(action) {
    try {
        const res = yield call(authService.editClientAuthorizationService, action);
        window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error create client')
    }
}

function* deleteClientAuthorizations(action) {
    try {
        const res = yield call(authService.deleteClientAuthorizationService, action);
         window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error del enroll')
    }
}



function* getClientsAuthorizationsServ(action) {
    try {
        const res = yield call(authService.getClientAuthorizationServService, action);
        yield put({
            type: GET_CLIENT_AUTHORIZATION_SERV_SUCCESS,
            payload: res.data,
        });
    } catch (err) {
        console.log(err, 'authhhhhhhh get en roll')
    }
}

function* createClientsAuthorizationsServ(action) {
    try {
        const res = yield call(authService.createClientAuthorizationServService, action);
        // window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error create auth')
    }
}


function* editClientAuthorizationsServ(action) {
    try {
        const res = yield call(authService.editClientAuthorizationServService, action);
        window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error create client')
    }
}

function* deleteClientAuthorizationsServ(action) {
    try {
        const res = yield call(authService.deleteClientAuthorizationServService, action);
        window.location.replace('/client')
    } catch (err) {
        console.log(err, 'error del enroll')
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
    yield takeLatest(CREATE_CLIENT_ENROLLMENT, createClientEnrollment)
    yield takeLatest(EDIT_CLIENT_ENROLLMENT, editClientEnrollment)
    yield takeLatest(DELETE_CLIENT_ENROLLMENT, deleteClientEnrollment)
    yield takeLatest(GET_CLIENT_AUTHORIZATION, getClientsAuthorizations)
    yield takeLatest(CREATE_CLIENT_AUTHORIZATION, createClientsAuthorizations)
    yield takeLatest(EDIT_CLIENT_AUTHORIZATION, editClientAuthorizations)
    yield takeLatest(DELETE_CLIENT_AUTHORIZATION, deleteClientAuthorizations)
    yield takeLatest(GET_CLIENT_AUTHORIZATION_SERV, getClientsAuthorizationsServ)
    yield takeLatest(CREATE_CLIENT_AUTHORIZATION_SERV, createClientsAuthorizationsServ)
    yield takeLatest(EDIT_CLIENT_AUTHORIZATION_SERV, editClientAuthorizationsServ)
    yield takeLatest(DELETE_CLIENT_AUTHORIZATION_SERV, deleteClientAuthorizationsServ)


};
