import {
    CREATE_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
    GET_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS,
} from "./availabilitySchedule.type";

const initialState = {
    availabilitySchedule: {},
};

export const availabilityScheduleReducer = (state = initialState, action) => {
    switch (action.type) {
        case  GET_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS :
            return {
                ...state,
                availabilitySchedule: action.payload
            }

        case  CREATE_AVAILABILITY_SCHEDULE_GLOBAL_SUCCESS:
            return {
                ...state,
                availabilitySchedule: action.payload
            }
        default:
            return state;
    }
};