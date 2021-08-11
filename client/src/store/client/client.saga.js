import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./client.service";
import {
    CREATE_CLIENT,
    DELETE_CLIENT, EDIT_CLIENT,
    GET_CLIENT_BY_ID, GET_CLIENT_BY_ID_SUCCESS,
    GET_CLIENTS,
    GET_CLIENTS_SUCCESS
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
        console.log(err, 'error')
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
        console.log(res,'rrrrrrrrrrrrrrr')
        // window.location.replace('/client')
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


export const watchClient = function* watchClientSaga() {

    yield takeLatest(GET_CLIENTS, getClients)
    yield takeLatest(CREATE_CLIENT, createClient)
    yield takeLatest(DELETE_CLIENT, deleteClient)
    yield takeLatest(EDIT_CLIENT, editClient)
    yield takeLatest(GET_CLIENT_BY_ID, getClientById)


};
