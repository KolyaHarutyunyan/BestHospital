import { call, put, takeLatest } from "redux-saga/effects";
import { availabilityScheduleService } from "./availabilitySchedule.service";
import {
   CREATE_AVAILABILITY_SCHEDULE_GLOBAL,
   GET_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
   GET_AVAILABILITY_SCHEDULE_GLOBAL,
} from "./availabilitySchedule.type";
import { httpRequestsOnLoadActions } from "../http_requests_on_load";
import { httpRequestsOnErrorsActions } from "../http_requests_on_errors";
import { httpRequestsOnSuccessActions } from "../http_requests_on_success";

function* getAvailabilitySchedule(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      const res = yield call(
         availabilityScheduleService.getAvailabilityScheduleService,
         action.payload.id || action.payload
      );
      yield put({
         type: GET_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
         payload: res.data,
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
   } catch (err) {
      yield put({
         type: GET_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
         payload: [],
      });
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

function* createAvailabilitySchedule(action) {
   yield put(httpRequestsOnLoadActions.appendLoading(action.type));
   try {
      yield call(availabilityScheduleService.createAvailabilityScheduleService, action);
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnSuccessActions.appendSuccess(action.type));
      yield put({
         type: GET_AVAILABILITY_SCHEDULE_GLOBAL,
         payload: action.payload.id,
      });
   } catch (err) {
      yield put(httpRequestsOnLoadActions.removeLoading(action.type));
      yield put(httpRequestsOnErrorsActions.appendError(action.type, err?.data?.message));
   }
}

export const watchAvailabilitySchedule = function* watchAvailabilityScheduleSaga() {
   yield takeLatest(GET_AVAILABILITY_SCHEDULE_GLOBAL, getAvailabilitySchedule);
   yield takeLatest(CREATE_AVAILABILITY_SCHEDULE_GLOBAL, createAvailabilitySchedule);
};
