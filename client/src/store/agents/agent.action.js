import {
  CREATE_AGENT,
  GET_AGENT_BY_ID,
  GET_AGENTS
} from "./agent.types";

export const createAgent = (body) => {
  return {
    type: CREATE_AGENT,
    payload: { body }
  }
}

export const getAgents = () => {
  return {
    type: GET_AGENTS
  }
}

export const getAgentById = (adminId) => {
  return {
    type: GET_AGENT_BY_ID,
    payload: { adminId }
  }
}
