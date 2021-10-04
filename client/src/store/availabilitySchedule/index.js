import {
    getAvailabilitySchedule,
    createAvailabilitySchedule,
} from "./availabilitySchedule.action";

export {availabilityScheduleReducer} from './availabilitySchedule.reducer';
export {watchAvailabilitySchedule} from './availabilitySchedule.saga';

export const availabilityScheduleActions = {
    getAvailabilitySchedule,
    createAvailabilitySchedule,
}

