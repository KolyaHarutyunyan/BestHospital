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
    CREATE_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR,
    EDIT_ACTIVE_OR_INACTIVE,
    EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT, SET_STATUS,
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
            type: GET_FUNDING_SOURCE,
            payload: { status : 1, start : 0, end : 10 },
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
    }
}

function* editFundingSource(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
     yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.editFundingSourceService, action.payload.id, action.payload.body);
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, err.data.message));
        console.log(err)
    }
}


function* getFundingSource(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));

    try {
        const res = yield call(authService.getFundingSourceService, action.payload);

        yield put({
            type: GET_FUNDING_SOURCE_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
    }
}

function* getFundingSourceById(action) {
    try {
        const res = yield call(authService.getFoundingSourceByIdService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_BY_ID_SUCCESS,
            payload: res.data,
        });
    } catch (error) {

        console.log(error)
    }
}

function* getFundingSourceServicesById(action) {
    try {
        const res = yield call(authService.getFoundingSourceServiceByIdService, action.payload);
        console.log(res,'resssssesesesese')
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        console.log(error,'erererererererererer')
    }
}



function* createFundingSourceServicesById(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
    try {
        const res = yield call(authService.createFoundingSourceServiceByIdService, action.payload.id, action.payload.body);
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put({
            type: CREATE_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
            payload: res.data,
        });

        const body = {
            modifiers: action.payload.modifier,
            serviceId: res.data._id,
        }
        yield put({
            type: CREATE_FUNDING_SOURCE_SERVICE_MODIFIER,
            payload: {body}
        })

        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));

    } catch (error) {
        console.log(error, 'err create services')
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
    }
}

function* editFundingSourceServices(action) {

    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
    try {
        const res = yield call(authService.editFoundingSourceServiceService, action.payload.id, action.payload.body);

        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));

        const body = {
            modifiers: action.payload.modifier ,
             // serviceId: res.data._id,
        }
        yield put({
            type: EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
            payload: {body : body ,id: action.payload.id}
        })
    } catch (error) {
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
    }
}

function* createFundingSourceServicesModifier({payload}) {
    try {

        const res = yield call(authService.createFoundingSourceServiceModifierService, payload.body);
    } catch (error) {
        console.log(error, 'res mod')
    }
}


function* editFundingSourceServicesModifier({payload}) {
    try {

        const res = yield call(authService.editFoundingSourceServiceModifierService,payload.id, payload.body, payload.fId);
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS,
            payload:  payload.id,
        })
    } catch (error) {
        console.log(error, 'res mod')
    }
}


function* getFundingSourceServicesModifier(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getFoundingSourceServiceModifierService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));



    } catch (error) {
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR,
            payload: error,
        });
        console.log(error.data.message, 'get modifier')
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
            payload: [],
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));

    }
}

function* getFundingSourceServicesModifierClient(action) {

    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.removeLoading(action.type));
    yield put(httpRequestsOnSuccessActions.removeSuccess(action.type))
    try {
        const res = yield call(authService.getFoundingSourceServiceModifierService, action.payload);
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_SUCCESS,
            payload: res.data,
        });
    } catch (error) {
        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR,
            payload: error,
        });
        console.log(error.data.message, 'get modifier')
    }
}

function* getFundingSourceHistoriesById(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    try {
        const res = yield call(authService.getFundingSourceHistoriesByIdService, action.payload.onModal, action.payload.searchDate);
        yield put({
            type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
            payload: res.data,
        });
    } catch (error) {

        if(!action.payload.searchDate){
            yield put({
                type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
                payload: [],
            });
        } else {
            yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
        }
    }
}

function* editActiveOrInactive(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.editActiveOrInactiveService, action.payload.id , action.payload.path, action.payload.status, action.payload.body , );
        yield put({
            type: action.payload.type,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}

function* setStatus(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.setStatusService, action.payload.id , action.payload.path, action.payload.status, action.payload.body , );
        console.log(res,'res for status')
        yield put({
            type: action.payload.type,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        console.log(error,'errr for status')
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
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
    yield takeLatest(GET_FUNDING_SOURCE_SERVICE_MODIFIERS, getFundingSourceServicesModifier);
    yield takeLatest(GET_FUNDING_SOURCE_HISTORIES_BY_ID, getFundingSourceHistoriesById);
    // yield takeLatest(GET_FUNDING_SOURCE_SERV, getFundingSourceServ);
    yield takeLatest(EDIT_ACTIVE_OR_INACTIVE, editActiveOrInactive);
     yield takeLatest(EDIT_FUNDING_SOURCE_SERVICE_MODIFIER, editFundingSourceServicesModifier);
    yield takeLatest(GET_FUNDING_SOURCE_SERVICE_MODIFIERS_CLIENT, getFundingSourceServicesModifierClient);
    yield takeLatest(SET_STATUS, setStatus);
};
