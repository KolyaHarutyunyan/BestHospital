import { API_BASE } from '../constants';
import axios from "axios";

const path = `${API_BASE}`;
const token = localStorage.getItem('access-token')
const header = { headers: { 'access-token': token } }

export const authService = {

  createAgentService: ( body ) => axios.post('/agents', body),

  getAgentsService: ( ) => axios.get('/agents', header),

  getAgentByIdService: ( id ) => axios.get(`/agents/${id}`, header),

};
