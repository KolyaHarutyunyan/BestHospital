import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  CLEAR_ERROR,
  GET_RECOVERY_LINK,
  GET_RECOVERY_LINK_SUCCESS,
  GET_RECOVERY_LINK_TRY_AGAIN,
  GET_RECOVERY_LINK_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_CLEAR, GET_ACCESS_SUCCESS
} from './auth.types';

const initialState = {
  accessToke:null,
  permissions:'',
  isAuthenticated: false,
  loginErr: null,
  loader: false,
  admin: null,

  getLinkLoading: false,
  getLinkSuccess: null,
  resetSuccess: false,
  closeResetSuccess:null,

  accessList:[],
};

export const authReducer = (state = initialState, action) => {
  switch ( action.type ) {

    case  LOG_IN:
      return {
        ...state,
        loader: true,
      }

    case LOG_IN_SUCCESS:
      return {
        ...state,
        admin: action.payload.data.permissions,
        accessToke: action.payload.data.token,
        permissions: action.payload.data.permissions,
        loader: false,
      };

    case LOG_IN_FAIL:
      return {
        ...state,
        loginErr: action.payload,
        loader: false
      };

    case GET_RECOVERY_LINK :
      return {
        ...state,
        getLinkLoading: true,
      }

    case GET_RECOVERY_LINK_SUCCESS :
      return {
        ...state,
        getLinkLoading: false,
        getLinkSuccess: true,
      }

    case GET_RECOVERY_LINK_FAIL :
      return {
        ...state,
        getLinkLoading: false,
        getLinkSuccess: false,
      }

    case GET_RECOVERY_LINK_TRY_AGAIN :
      return {
        ...state,
        getLinkSuccess: null,
      }

    case RESET_PASSWORD_SUCCESS :
      return {
        ...state,
        resetSuccess: true,
        closeResetSuccess:'close'
      }

    case RESET_PASSWORD_CLEAR :
      return {
        ...state,
        resetSuccess: false,
        closeResetSuccess:'close'
      }

    case CLEAR_ERROR:
      return {
        ...state,
        loginErr: []
      };

    case GET_ACCESS_SUCCESS:
      return {
        ...state,
        accessList: action.payload,
      }

    default:
      return state;
  }
};
