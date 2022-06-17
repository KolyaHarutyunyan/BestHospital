import {
   EDIT_ADMIN_BY_ID_SUCCESS,
   GET_ADMIN_BY_ID,
   GET_ADMIN_BY_ID_SUCCESS,
   GET_ADMINS_SUCCESS,
   CREATE_CREDENTIAL_SUCCESS,
   GET_CREDENTIAL_SUCCESS,
   EDIT_CREDENTIAL_BY_ID_SUCCESS,
   DELETE_CREDENTIAL_BY_ID_SUCCESS,
   CREATE_ADMIN_SUCCESS,
   GET_EMPLOYMENT_SUCCESS,
   GET_PAY_CODE_SUCCESS,
   GET_STAFF_SERVICE_SUCCESS,
   GET_ALL_PAYCODES_SUCCESS,
   GET_TIMESHEET_SUCCESS,
   GET_ALL_ADMINS_SUCCESS,
   GET_TIMESHEET_BY_ID_SUCCESS,
   CLEAR_ALL_PAYCODES,
   GET_ALL_PAYCODES_FAIL,
} from "./admin.types";

const initialState = {
   adminsList: [],
   adminsAllList: [],
   adminsListReserve: [],
   adminInfoById: "",
   credential: [],
   employments: [],
   payCodes: [],
   staffServices: [],
   allPaycodes: [],
   timesheet: [],
   timesheetById: [],
};

export const adminReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_ADMINS_SUCCESS:
         return {
            ...state,
            adminsList: action.payload.staff,
         };
      case GET_ALL_ADMINS_SUCCESS:
         return {
            ...state,
            adminsAllList: action.payload,
         };

      case EDIT_ADMIN_BY_ID_SUCCESS:
         return {
            ...state,
            adminInfoById: action.payload,
         };
      case GET_ADMIN_BY_ID_SUCCESS:
         return {
            ...state,
            adminInfoById: action.payload,
         };
      case GET_ADMIN_BY_ID:
         return {
            ...state,
            adminInfoById: action.payload.adminId,
         };

      case CREATE_CREDENTIAL_SUCCESS:
         return {
            ...state,
            credential: [action.payload, ...state.credential],
         };

      case GET_CREDENTIAL_SUCCESS:
         return {
            ...state,
            credential: action.payload,
         };
      case EDIT_CREDENTIAL_BY_ID_SUCCESS:
         return {
            ...state,
            credentialById: action.payload,
         };

      case DELETE_CREDENTIAL_BY_ID_SUCCESS:
         return {
            ...state,
            credentialById: "",
         };
      case GET_EMPLOYMENT_SUCCESS:
         return {
            ...state,
            employments: action.payload.reverse(),
         };
      case GET_PAY_CODE_SUCCESS:
         return {
            ...state,
            payCodes: action.payload.reverse(),
         };
      case GET_STAFF_SERVICE_SUCCESS:
         return {
            ...state,
            staffServices: action.payload,
         };
      case GET_ALL_PAYCODES_SUCCESS:
         return {
            ...state,
            allPaycodes: action.payload,
         };
      case GET_ALL_PAYCODES_FAIL:
         return {
            ...state,
            allPaycodes: [],
         };
      case CLEAR_ALL_PAYCODES:
         return {
            ...state,
            allPaycodes: [],
         };
      case GET_TIMESHEET_SUCCESS:
         return {
            ...state,
            timesheet: action.payload,
         };

      case GET_TIMESHEET_BY_ID_SUCCESS:
         return {
            ...state,
            timesheetById: action.payload,
         };
      default:
         return state;
   }
};
