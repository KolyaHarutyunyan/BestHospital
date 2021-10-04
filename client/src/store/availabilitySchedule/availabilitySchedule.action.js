import {CREATE_AVAILABILITY_SCHEDULE_GLOBAL, GET_AVAILABILITY_SCHEDULE_GLOBAL} from "./availabilitySchedule.type";

export const getAvailabilitySchedule = ( id) => {
    return {
        type: GET_AVAILABILITY_SCHEDULE_GLOBAL,
        payload: { id }
    }
}


export const createAvailabilitySchedule = (data, id, onModel) => {
    return {
        type: CREATE_AVAILABILITY_SCHEDULE_GLOBAL,
        payload: { data, id, onModel }
    }
}