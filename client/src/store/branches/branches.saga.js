import {call, put, takeLatest} from "redux-saga/effects";
import {authService} from "./branches.service";
import {
    CREATE_BRANCH,
    GET_BRANCHES,
    GET_BRANCHES_SUCCESS,
} from "./branches.types";
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";

function* createBranch(action) {
    try {
        const res = yield call(authService.createBranchService, action.payload.body);
        window.location.replace('/branches')
    } catch (err) {
        console.log(err)
    }
}

function* getBranch({action,type}) {
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call(authService.getBranchesService);
        yield put({
            type: GET_BRANCHES_SUCCESS,
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


export const watchBranch = function* watchBrancheseSaga() {
    yield takeLatest(CREATE_BRANCH, createBranch);
    yield takeLatest(GET_BRANCHES, getBranch);
};
