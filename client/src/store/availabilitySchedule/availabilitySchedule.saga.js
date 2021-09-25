import {call, put, takeLatest} from "redux-saga/effects";
import {availabilityScheduleService} from "./availabilitySchedule.service";
import {
    CREATE_AVAILABILITY_SCHEDULE_GLOBAL,
    CREATE_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
    GET_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
    GET_AVAILABILITY_SCHEDULE_GLOBAL
} from "./availabilitySchedule.type";

function* getAvailabilitySchedule(action) {
    try {
        const res = yield call(availabilityScheduleService.getAvailabilityScheduleService, action.payload.id,);
        yield put({
            type: GET_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
            payload: res.data,
        });


    } catch (error) {
        console.log(error)
    }
}

function* createAvailabilitySchedule(action) {
    try {
        const res = yield call(availabilityScheduleService.createAvailabilityScheduleService, action);
        yield put({
            type: CREATE_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
            payload: res.data,
        });

    } catch (error) {
       console.log(error)
    }
}


export const watchAvailabilitySchedule = function* watchAvailabilityScheduleSaga() {
    yield takeLatest(GET_AVAILABILITY_SCHEDULE_GLOBAL, getAvailabilitySchedule);
    yield takeLatest(CREATE_AVAILABILITY_SCHEDULE_GLOBAL, createAvailabilitySchedule);
};
