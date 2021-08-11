import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./client.service";
import {CREATE_CLIENT, CREATE_CLIENTS_SUCCESS, DELETE_CLIENT, GET_CLIENTS, GET_CLIENTS_SUCCESS} from "./client.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";



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


export const watchClient = function* watchClientSaga() {

    yield takeLatest(GET_CLIENTS, getClients)
    yield takeLatest(CREATE_CLIENT, createClient)
    yield takeLatest(DELETE_CLIENT, deleteClient)


};
