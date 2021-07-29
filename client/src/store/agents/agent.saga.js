import { call, put, takeLatest } from "redux-saga/effects";
import { authService } from "./agent.service";
import {
  CREATE_ADMIN,
  CREATE_AGENT,
  GET_ADMIN_BY_ID,
  GET_ADMIN_BY_ID_SUCCESS,
  GET_ADMINS,
  GET_ADMINS_SUCCESS,
  GET_AGENT_BY_ID, GET_AGENT_BY_ID_SUCCESS,
  GET_AGENTS, GET_AGENTS_SUCCESS,

} from "./agent.types";

function* createAgent(action) {
  try {
    const res = yield call( authService.createAgentService, action.payload.body );
    window.location.replace('/agents')

   
  } catch (err) {
    console.log(err)
  }
}

function* getAgents(action) {
  try {
    const res = yield call( authService.getAgentsService, action.payload );
    yield put({
      type: GET_AGENTS_SUCCESS,
      payload: res.data.reverse(),
    });

  } catch (err) {
    console.log(err)
  }
}

function* getAgentById(action) {
  try {
    const res = yield call( authService.getAgentByIdService, action.payload );
    yield put({
      type: GET_AGENT_BY_ID_SUCCESS,
      payload: res.data,
    });

  } catch (err) {
    console.log(err)
  }
}

export const watchAgent = function* watchAgentSaga() {
  yield takeLatest( CREATE_AGENT, createAgent );
  yield takeLatest( GET_AGENTS, getAgents );
  yield takeLatest( GET_AGENT_BY_ID, getAgentById );
};
