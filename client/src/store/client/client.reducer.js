import {
    GET_CLIENTS_SUCCESS,
    CREATE_CLIENTS_SUCCESS
} from "./client.types";
import {paginate} from "@eachbase/utils";


const initialState = {
    clientList: [],

};

export const clientReducer = (state = initialState, action) => {
    switch (action.type) {

        case  GET_CLIENTS_SUCCESS:
            return {
                ...state,
                clientList: action.payload,
            }



        default:
            return state;
    }
};
