import { call, put, takeLatest } from 'redux-saga/effects';
import { authService } from './auth.service';
import {
    LOG_IN,
    LOG_IN_SUCCESS,
    LOG_IN_FAIL,
    LOG_OUT,
    GET_RECOVERY_LINK,
    GET_RECOVERY_LINK_SUCCESS,
    GET_RECOVERY_LINK_FAIL,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    CHANGE_PASSWORD_REQUEST
} from './auth.types';
import {httpRequestsOnErrorsActions} from "../http_requests_on_errors";
import {httpRequestsOnLoadActions} from "../http_requests_on_load";
import {httpRequestsOnSuccessActions} from "../http_requests_on_success";

function* logIn({payload,type}) {
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call( authService.signIn, payload );
        localStorage.setItem('access-token', res.data.token);
        localStorage.setItem('permissions', res.data.permissions);
        localStorage.setItem('poloUserInfo', JSON.stringify(res.data.user) );
        window.location.replace('/')
        yield put({
            type: LOG_IN_SUCCESS,
            payload: res.data,
        });
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));

    } catch (err) {
        yield put(httpRequestsOnErrorsActions.appendError(type, err.data.message))
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        // yield put(httpRequestsOnErrorsActions.removeError(type));
    }
}

function* logOut() {
    try {
        const res = yield call( authService.logOut, );
        localStorage.removeItem('access-token');
        localStorage.removeItem('poloUserInfo'  );
        window.location.replace('/login')
    } catch (err) {

        if(err.response.data.statusCode === 401){
            localStorage.removeItem('access-token');
            localStorage.removeItem('poloUserInfo'  );
            window.location.replace('/login')
        }
    }
}

function* getLink({payload, type}) {
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        yield call( authService.getLink, payload.email );
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(type));
    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.appendError(type, err.data.error));
    }
}

function* resetPassword({payload, type}) {
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    try {
        const res = yield call( authService.resetPass, payload.passwords );
        localStorage.removeItem('Reset')
        window.location.reload()
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));

    } catch (err) {
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.appendError(type, err.data.error));
    }
}


function* changePassword({payload, type}){
    yield put(httpRequestsOnErrorsActions.removeError(type));
    yield put(httpRequestsOnLoadActions.appendLoading(type));
    try{

        const res = yield call( authService.changePasswordService, payload.data );
        localStorage.setItem('access-token', res.data.accessToken);
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));
        yield put(httpRequestsOnSuccessActions.appendSuccess(type));

    }catch (err){
        yield put(httpRequestsOnLoadActions.removeLoading(type));
        yield put(httpRequestsOnErrorsActions.removeError(type));
    }
}


function* checkUser(action){
    try{
        const res = yield call( authService.checkUser, action.payload.data );

    }catch (err){

    }
}

export const watchAuth = function* watchUserAuth() {
    yield takeLatest( LOG_IN, logIn );
    yield takeLatest( LOG_OUT, logOut );
    yield takeLatest( GET_RECOVERY_LINK, getLink );
    yield takeLatest( RESET_PASSWORD_REQUEST, resetPassword );
    yield takeLatest( CHANGE_PASSWORD_REQUEST, changePassword );
};
