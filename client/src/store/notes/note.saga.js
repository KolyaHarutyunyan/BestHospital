import {call, put, takeLatest} from "redux-saga/effects";
import {noteService} from "./note.service";
import {
    CREATE_GLOBAL_NOTE, CREATE_GLOBAL_NOTES_SUCCESS,
    DELETE_GLOBAL_NOTE,
    EDIT_GLOBAL_NOTE,
    GET_GLOBAL_NOTES,
    GET_GLOBAL_NOTES_SUCCESS
} from "./note.type";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";

function* getGlobalNotes(action) {
    try {
        const res = yield call(noteService.getGlobalNotesService, action.payload.id, action.payload.onModel);
        yield put({
            type: GET_GLOBAL_NOTES_SUCCESS,
            payload: res.data,
        });


    } catch (error) {
        console.log(error)
    }
}

function* creteGlobalNote(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        const res = yield call(noteService.createGlobalNoteService, action.payload.body);

        yield put({
            type: CREATE_GLOBAL_NOTES_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}

function* editGlobalNote(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(noteService.editGlobalNoteService, action.payload.id, action.payload.body);
        yield put({
            type: GET_GLOBAL_NOTES,
            payload:{ id : action.payload.fId, onModel : action.payload.onModel}
        });
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}


function* deleteGlobalNote(action) {
    yield put(httpRequestsOnErrorsActions.removeError(action.type));
    yield put(httpRequestsOnLoadActions.appendLoading(action.type));
    try {
        yield call(noteService.deleteGlobalNoteService, action.payload.id);
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
        yield put({
            type: GET_GLOBAL_NOTES,
            payload:{id : action.payload.fId, onModal : 'Funder'}
        });
    } catch (error) {
        yield put(httpRequestsOnLoadActions.removeLoading(action.type));
        yield put(httpRequestsOnErrorsActions.appendError(action.type, error.data.message));
    }
}


export const watchNotes = function* watchNoteSaga() {
    yield takeLatest(GET_GLOBAL_NOTES, getGlobalNotes);
    yield takeLatest(CREATE_GLOBAL_NOTE, creteGlobalNote);
    yield takeLatest(EDIT_GLOBAL_NOTE, editGlobalNote);
    yield takeLatest(DELETE_GLOBAL_NOTE, deleteGlobalNote);

};
