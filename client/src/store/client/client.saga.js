import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./client.service";
import {GET_CLIENTS, GET_CLIENTS_SUCCESS} from "./client.types";
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


export const watchClient = function* watchClientSaga() {

    yield takeLatest(GET_CLIENTS, getClients)


};
