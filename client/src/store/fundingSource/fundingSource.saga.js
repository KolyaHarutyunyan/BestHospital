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
    GET_FUNDING_SOURCE_SERVICE_MODIFIERS_ERR, EDIT_ACTIVE_OR_INACTIVE, EDIT_FUNDING_SOURCE_SERVICE_MODIFIER,
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
    // yield put(httpRequestsOnErrorsActions.removeError(action.type));
    // yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getFoundingSourceServiceByIdService, action.payload);

        yield put({
            type: GET_FUNDING_SOURCE_SERVICE_BY_ID_SUCCESS,
            payload: res.data,
        });
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));


    } catch (error) {
        // yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        // yield put(httpRequestsOnErrorsActions.removeError(action.type));
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
    // console.log(action,'paaaay')
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
        }),
            yield put({
            type: GET_FUNDING_SOURCE_SERVICE_BY_ID,
            payload:  payload.fsId,
        })
    } catch (error) {
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.removeSuccess(action.type));
    }
}

function* createFundingSourceServicesModifier({payload}) {
    console.log()
    try {

        const res = yield call(authService.createFoundingSourceServiceModifierService, payload.body);
        console.log(res, 'create fon moooooood')
    } catch (error) {
        console.log(error, 'res mod')
    }
}



function* editFundingSourceServicesModifier({payload}) {
    try {

        const res = yield call(authService.editFoundingSourceServiceModifierService,payload.id, payload.body, payload.fId);
        console.log(res, 'edit funding source')
    } catch (error) {
        console.log(error, 'res mod')
    }
}





function* getFundingSourceServicesModifier(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.getFoundingSourceServiceModifierService, action.payload);
        // console.log(res,'reeesssssdfsdfsdfsdf')
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
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.removeError(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}


function* getFundingSourceHistoriesById(action) {

    try {
        const res = yield call(authService.getFundingSourceHistoriesByIdService, action.payload.id, action.payload.onModal);

        yield put({
            type: GET_FUNDING_SOURCE_HISTORIES_BY_ID_SUCCESS,
            payload: res.data,
        });



    } catch (error) {}
}

function* getFundingSourceNotes(action) {
    try {
        const res = yield call(authService.getFundingSourceNotesService, action.payload.id, action.payload.onModal);

        yield put({
            type: GET_FUNDING_SOURCE_NOTES_SUCCESS,
            payload: res.data,
        });
    } catch (error) {}
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
            type: GET_FUNDING_SOURCE_NOTES,
            payload: {id: action.payload.fId, onModal: 'Funder'}
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}


function* deleteFundingSourceNote(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(authService.deleteFoundingSourceNoteService, action.payload.id);
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_FUNDING_SOURCE_NOTES,
            payload: {id: action.payload.fId, onModal: 'Funder'}
        });
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
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
    yield takeLatest(GET_FUNDING_SOURCE_SERVICE_MODIFIERS, getFundingSourceServicesModifier);
    yield takeLatest(GET_FUNDING_SOURCE_HISTORIES_BY_ID, getFundingSourceHistoriesById);
    yield takeLatest(GET_FUNDING_SOURCE_SERV, getFundingSourceServ);
    yield takeLatest(CREATE_FUNDING_SOURCE_SERV, creteFundingSourceServ);
    yield takeLatest(GET_FUNDING_SOURCE_SERV_BY_ID, getFundingSourceServById);
    yield takeLatest(GET_FUNDING_SOURCE_NOTES, getFundingSourceNotes);
    yield takeLatest(CREATE_FUNDING_SOURCE_NOTE, creteFundingSourceNote);
    yield takeLatest(EDIT_FUNDING_SOURCE_NOTE, editFundingSourceNote);
    yield takeLatest(DELETE_FUNDING_SOURCE_NOTE, deleteFundingSourceNote);
    yield takeLatest(EDIT_ACTIVE_OR_INACTIVE, editActiveOrInactive);
    yield takeLatest(EDIT_FUNDING_SOURCE_SERVICE_MODIFIER, editFundingSourceServicesModifier);

};
