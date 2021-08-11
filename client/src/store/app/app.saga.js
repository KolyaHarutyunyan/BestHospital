import { fork  } from 'redux-saga/effects';
import { watchAuth } from '../auth';
import {watchPermission} from "../permissions";
import {watchOffice} from "../offices";
import {watchRole} from "../role";
import {watchAdmin} from "../admin";
import {watchFundingSource} from "../fundingSource";
import {watchAgent} from "../agents";
import {watchClient} from "../client";


/** Combined Sagas */
export const appSaga = function* startForman() {
    yield fork(watchAuth);
    yield fork(watchAdmin);
    yield fork(watchRole);
    yield fork(watchOffice);
    yield fork(watchPermission);
    yield fork(watchFundingSource)
    yield fork(watchAgent)
    yield fork(watchClient)
};
