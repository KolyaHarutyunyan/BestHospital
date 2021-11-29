import {
    FILTER_APPOINTMENT_DATE,
    GET_APPOINTMENT_BY_ID_SUCCESS,
    GET_APPOINTMENT_SUCCESS,
    SET_APPOINTMENT_STATUS_SUCCESS
} from "./appointment.type";
import moment from "moment";

const initialState = {
    appointments: [],
    appointmentById: [],
    appointmentsReserve:[],
};

export const appointmentReducer = (state = initialState, action) => {
    // console.log(state.calendarAppointmentsReserve,'calendarAppointmentsReserve')
    switch (action.type) {
        case  GET_APPOINTMENT_SUCCESS :
            return {
                ...state,
                appointments: action.payload,
                appointmentsReserve: action.payload,
            }

            case  SET_APPOINTMENT_STATUS_SUCCESS :
            return {
                ...state,
                appointments: state.appointments.map((post) =>

                    post._id === action.payload._id ?   { ...action.payload,} : post ),
            }

            case  GET_APPOINTMENT_BY_ID_SUCCESS :
            return {
                ...state,
                appointmentById: action.payload
            }
        case FILTER_APPOINTMENT_DATE :
            return {
                ...state,
                appointments:  state.appointmentsReserve.filter((el) =>
                    moment(el._id).format('YYYY-MM-DD').toLowerCase().indexOf(action.payload.date.toLowerCase()) > -1
                ),
            }
        default:
            return state;
    }
};