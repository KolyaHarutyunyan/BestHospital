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
    EDIT_CLIENT_AUTHORIZATION_SERV,
    DELETE_CLIENT_AUTHORIZATION_SERV,
    GET_CLIENT_HISTORIES_SUCCESS,
    GET_CLIENT_HISTORIES,
    DELETE_CLIENT_NOTE,
    EDIT_CLIENT_NOTE,
    CREATE_CLIENT_NOTE,
    GET_CLIENT_NOTES,
    GET_CLIENT_NOTES_SUCCESS,
    CREATE_CLIENT_NOTE_SUCCESS,
    CREATE_CLIENT_CONTACT_SUCCESS,
    CREATE_CLIENT_SUCCESS,
    GET_CLIENT_AVAILABILITY_SCHEDULE_SUCCESS,
    GET_CLIENT_AVAILABILITY_SCHEDULE
} from "./client.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {
    CREATE_FUNDING_SOURCE_NOTES_SUCCESS, GET_FUNDING_SOURCE,
    GET_FUNDING_SOURCE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS, GET_FUNDING_SOURCE_NOTES, GET_FUNDING_SOURCE_NOTES_SUCCESS
} from "../fundingSource/fundingSource.types";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";


function* getClients(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getClientsService,action.payload);
        yield put({
            type: GET_CLIENTS_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    } catch (err) {
        console.log(err)
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* createClient(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createClientService, action);
        yield put({
            type: GET_CLIENTS,
            payload: { status : 1, start : 0, end : 10 },
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
        console.log(err, 'error create client')
    }
}

function* deleteClient(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.deleteClientService, action);
        yield put({
            type: GET_CLIENTS,
            payload: { status : 1, start : 0, end : 10 },
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
         yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err, 'error del client' )
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* editClient(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.editClientService, action);


        yield put({
            type: GET_CLIENT_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err, 'error edit cl')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* getClientById(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getClientByIdService, action);
        yield put({
            type: GET_CLIENT_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err, 'error')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
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
        console.log(err,'contact get errrr')
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* createClientContact(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
     yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createClientContactService, action);
        yield put({
            type: CREATE_CLIENT_CONTACT_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err, 'error add client')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* editClientContact(action) {

    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.editClientContactService, action);
        yield put({
            type: GET_CLIENT_CONTACTS,
            payload: {id: action.payload.paramsId},
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err, 'error edit client')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}


function* deleteClientContact(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
         const res = yield call(authService.deleteClientContactService, action);
        yield put({
            type: GET_CLIENT_CONTACTS,
            payload: {id: action.payload.paramsId},
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    } catch (err) {
        console.log(err, 'error del client')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
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

    }
}

function* getClientHistories(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getClientHistoriesService, action.payload.id, action.payload.onModal);

        yield put({
            type: GET_CLIENT_HISTORIES_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (error) {

        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    }
}

function* getClientNotes(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getClientNotesService, action.payload.id, action.payload.onModal);

        yield put({
            type: GET_CLIENT_NOTES_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (error) {

        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    }
}

function* creteClientNote(action) {

    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createClientNoteService, action.payload.body);

        yield put({
            type: CREATE_CLIENT_NOTE_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}


function* editClientNote(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));


    try {
        const res = yield call(authService.editClientNoteService, action.payload.id, action.payload.body);

        yield put({
            type: GET_CLIENT_NOTES,
            payload: {id: action.payload.fId, onModal: 'Client'}
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}


function* deleteClientNote(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.deleteClientNoteService, action.payload.id);

        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_CLIENT_NOTES,
            payload: {id: action.payload.fId, onModal: 'Client'}
        });
    } catch (error) {

        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}




function* getClientsAvailabilitySchedule(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getClientsAvailabilityScheduleService, action.payload.id, );
        console.log(res, 'get F S AVEL')
        // yield put({
        //     type: GET_CLIENT_AVAILABILITY_SCHEDULE_SUCCESS,
        //     payload: res.data,
        // });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (error) {
        console.log(error, 'errr get F S AVEL')
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));
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
    yield takeLatest(GET_CLIENT_HISTORIES, getClientHistories)
    yield takeLatest(GET_CLIENT_NOTES, getClientNotes)
    yield takeLatest(CREATE_CLIENT_NOTE, creteClientNote)
    yield takeLatest(EDIT_CLIENT_NOTE, editClientNote)
    yield takeLatest(DELETE_CLIENT_NOTE, deleteClientNote)
    yield takeLatest(GET_CLIENT_AVAILABILITY_SCHEDULE, getClientsAvailabilitySchedule)


};
