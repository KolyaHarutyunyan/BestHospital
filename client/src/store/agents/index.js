import { createAgent, getAgentById, getAgents} from "./agent.action";

export { agentReducer } from './agent.reducer';
export { watchAgent } from './agent.saga';

export const agentActions = {
  createAgent,
  getAgents,
  getAgentById

}