import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./fundingSource.service";
import {
    CREATE_FUNDING_SOURCE,
    GET_FUNDING_SOURCE,
    GET_FUNDING_SOURCE_BY_ID,
    GET_FUNDING_SOURCE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SUCCESS,
    GET_FUNDING_SOURCE_SERVICE_BY_ID,
    GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
    CREATE_FUNDING_SOURCE_SERVICE_BY_ID,
    GET_FUNDING_SOURCE_HISTORIES_BY_ID,
    GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SERV,
    GET_FUNDING_SOURCE_SERV_SUCCESS,
    CREATE_FUNDING_SOURCE_SERV,
    GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SERV_BY_ID,
} from "./fundingSource.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";


function* createFundingSource(action) {
    try {
        const res = yield call(authService.createFundingSourceService, action.payload.body);
        window.location.replace('/fundingSource')
    } catch (err) {
        console.log(err)
    }
}


function* getFundingSource({action, type}) {
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call(authService.getFundingSourceService);
        yield put({
            type: GET_FUNDING_SOURCE_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));


    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));
        console.log(err)
    }
}

function* getFundingSourceById(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(type));
    // yield put(httpRequestsOnLoadActions.appendLoading(type));
    console.log(action.payload, 'saga');

    try {
        const res = yield call(authService.getFoundingSourceByIdService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));


    } catch (error) {
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));
        console.log(error)
    }
}

function* getFundingSourceServicesById(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(type));
    // yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call(authService.getFoundingSourceServiceByIdService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));


    } catch (error) {
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));
    }
}

function* createFundingSourceServicesById({payload}) {
    try {
        const res = yield call(authService.createFoundingSourceServiceByIdService, payload.id, payload.body);
    } catch (error) {

    }
}

function* getFundingSourceHistoriesById(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(type));
    // yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call(authService.getFundingSourceHistoriesByIdService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));


    } catch (error) {
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));
        console.log(error)
    }
}

function* getFundingSourceServ(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(type));
    // yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call(authService.getFundingSourceServService);
        yield put({
            type: GET_FUNDING_SOURCE_SERV_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));


    } catch (error) {
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));
    }
}

function* getFundingSourceServById(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(type));
    // yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call(authService.getFundingSourceServByIdService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_SERV_BY_ID_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));


    } catch (error) {
        // yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));
    }
}


function* creteFundingSourceServ({payload}) {
    try {
        const res = yield call(authService.createFundingSourceServService, payload.body);
    } catch (error) {

    }
}


export const watchFundingSource = function* watchFundingSourceSaga() {
    yield takeLatest(CREATE_FUNDING_SOURCE, createFundingSource);
    yield takeLatest(GET_FUNDING_SOURCE, getFundingSource);
    yield takeLatest(GET_FUNDING_SOURCE_BY_ID, getFundingSourceById);
    yield takeLatest(GET_FUNDING_SOURCE_SERVICE_BY_ID, getFundingSourceServicesById);
    yield takeLatest(CREATE_FUNDING_SOURCE_SERVICE_BY_ID, createFundingSourceServicesById);
    yield takeLatest(GET_FUNDING_SOURCE_HISTORIES_BY_ID, getFundingSourceHistoriesById);
    yield takeLatest(GET_FUNDING_SOURCE_SERV, getFundingSourceServ);
    yield takeLatest(CREATE_FUNDING_SOURCE_SERV, creteFundingSourceServ);
    yield takeLatest(GET_FUNDING_SOURCE_SERV_BY_ID, getFundingSourceServById);

};