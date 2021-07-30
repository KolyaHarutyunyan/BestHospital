import { fork } from 'redux-saga/effects';
import { watchAuth } from '../auth';
import {watchPermission} from "../permissions";
import {watchOffice} from "../offices";
import {watchRole} from "../role";
import {watchAdmin} from "../admin";
import {watchBranch} from "../branches";
import {watchAgent} from "../agents";


/** Combined Sagas */
export const appSaga = function* startForman() {
    yield fork(watchAuth);
    yield fork(watchAdmin);
    yield fork(watchRole);
    yield fork(watchOffice);
    yield fork(watchPermission);
    yield fork(watchBranch)
    yield fork(watchAgent)
};
