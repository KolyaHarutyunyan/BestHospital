import {
    GET_MILEAGES_SUCCESS
} from "./milage.types";

const initialState = {
    mileages: [],
};

export const mileageReducer = (state = initialState, action) => {
    switch (action.type) {

        /** Get Mileages */

        case GET_MILEAGES_SUCCESS:
            return {
                ...state,
                mileages: action.payload,
            }


        default:
            return state;
    }
};
