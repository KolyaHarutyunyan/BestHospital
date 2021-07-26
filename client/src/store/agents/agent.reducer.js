import {
  GET_AGENT_BY_ID_SUCCESS,
  GET_AGENTS, GET_AGENTS_SUCCESS

} from "./agent.types";
import { paginate } from "@eachbase/utils";

const initialState = {
  agentList:[],
  agentListReserve:[]
};

export const agentReducer = (state = initialState, action) => {
  switch ( action.type ) {

    case GET_AGENTS:
      return {
        ...state,
        adminsList: '',
      }

    case GET_AGENTS_SUCCESS:
      return {
        ... state,
        agentList: paginate((action.payload), 10),
        agentListReserve:action.payload,
      }

    case  GET_AGENT_BY_ID_SUCCESS:
      return {
        ...state,
        agentList: action.payload,
      }



    default:
      return state;
  }
};
