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
    CREATE_FUNDING_SOURCE_SERVICE_MODIFIER,
    EDIT_FUNDING_SOURCE,
    EDIT_FUNDING_SOURCE_SERVICE,
    GET_FUNDING_SOURCE_NOTES_SUCCESS,
    GET_FUNDING_SOURCE_NOTES,
    CREATE_FUNDING_SOURCE_NOTE,
    EDIT_FUNDING_SOURCE_NOTE,
    DELETE_FUNDING_SOURCE_NOTE,
    CREATE_FUNDING_SOURCE_NOTES_SUCCESS,
} from "./fundingSource.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";


function* createFundingSource(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createFundingSourceService, action.payload.body);
        yield put({
            type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        console.log(err,'ers')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* editFundingSource(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.editFundingSourceService, action.payload.id, action.payload.body);

        yield put({
            type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message  ));
        console.log(err)
    }
}


function* getFundingSource(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getFundingSourceService,action.payload.status);
        yield put({
            type: GET_FUNDING_SOURCE_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
        console.log(err)
    }
}

function* getFundingSourceById(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(type));
    // yield put(httpRequestsOnLoadActions.appendLoading(type));

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
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getFoundingSourceServiceByIdService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
    }
}

function* createFundingSourceServicesById({payload}) {
    try {
        const res = yield call(authService.createFoundingSourceServiceByIdService, payload.id, payload.body);

    } catch (error) {
        console.log(error,'eeeeerererere')
    }
}

function* editFundingSourceServices({payload}) {
    try {
        const res = yield call(authService.editFoundingSourceServiceService, payload.id, payload.body);
    } catch (error) {

    }
}

function* createFundingSourceServicesModifier({payload}) {
    try {
        const res = yield call(authService.createFoundingSourceServiceModifierService, payload.id, payload.body);
    } catch (error) {

    }
}
function* getFundingSourceHistoriesById(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getFundingSourceHistoriesByIdService, action.payload.id, action.payload.onModal);

        yield put({
            type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (error) {
        console.log(error,'eeeerrrrrorrrrrrr')
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    }
}


function* getFundingSourceNotes(action) {
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getFundingSourceNotesService, action.payload.id, action.payload.onModal);

        yield put({
            type: GET_FUNDING_SOURCE_NOTES_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (error) {
        console.log(error,'eeeerrrrrorrrrrrr')
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    }
}

function* creteFundingSourceNote(action) {

    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.createFoundingSourceNoteService, action.payload.body);

        yield put({
            type: CREATE_FUNDING_SOURCE_NOTES_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        console.log(error,'errrros')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}




function* editFundingSourceNote(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));

    try {
        const res = yield call(authService.editFoundingSourceNoteService, action.payload.id, action.payload.body);

        yield put({
            type: CREATE_FUNDING_SOURCE_NOTES_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        console.log(error,'errrros edit not')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}


function* deleteFundingSourceNote({payload}) {

    try {
        const res = yield call(authService.deleteFoundingSourceNoteService, payload.id);

    } catch (error) {
        console.log(error,'errrros')
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
    yield takeLatest(EDIT_FUNDING_SOURCE, editFundingSource);
    yield takeLatest(GET_FUNDING_SOURCE, getFundingSource);
    yield takeLatest(GET_FUNDING_SOURCE_BY_ID, getFundingSourceById);
    yield takeLatest(GET_FUNDING_SOURCE_SERVICE_BY_ID, getFundingSourceServicesById);
    yield takeLatest(CREATE_FUNDING_SOURCE_SERVICE_BY_ID, createFundingSourceServicesById);
    yield takeLatest(EDIT_FUNDING_SOURCE_SERVICE, editFundingSourceServices);
    yield takeLatest(CREATE_FUNDING_SOURCE_SERVICE_MODIFIER, createFundingSourceServicesModifier);
    yield takeLatest(GET_FUNDING_SOURCE_HISTORIES_BY_ID, getFundingSourceHistoriesById);
    yield takeLatest(GET_FUNDING_SOURCE_SERV, getFundingSourceServ);
    yield takeLatest(CREATE_FUNDING_SOURCE_SERV, creteFundingSourceServ);
    yield takeLatest(GET_FUNDING_SOURCE_SERV_BY_ID, getFundingSourceServById);
    yield takeLatest(GET_FUNDING_SOURCE_NOTES, getFundingSourceNotes);
    yield takeLatest(CREATE_FUNDING_SOURCE_NOTE, creteFundingSourceNote);
    yield takeLatest(EDIT_FUNDING_SOURCE_NOTE, editFundingSourceNote);
    yield takeLatest(DELETE_FUNDING_SOURCE_NOTE, deleteFundingSourceNote);

};
