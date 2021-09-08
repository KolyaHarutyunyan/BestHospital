import {CREATE_GLOBAL_NOTES_SUCCESS, GET_GLOBAL_NOTES_SUCCESS} from "./note.type";

const initialState = {
    notes: [],
};

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case  GET_GLOBAL_NOTES_SUCCESS :
            return {
                ...state,
                notes: action.payload.reverse()
            }

        case  CREATE_GLOBAL_NOTES_SUCCESS:
            return {
                ...state,
                notes: [action.payload,...state.notes, ]
            }
        default:
            return state;
    }
};