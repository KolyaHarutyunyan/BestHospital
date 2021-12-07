import { API_BASE } from '../constants';
import axios from "axios";

const path = `${API_BASE}`;
const token = localStorage.getItem('access-token')
const header = { headers: { 'access-token': token } }

export const authService = {

  createAgentService: ( body ) => axios.post('/agents', body, {auth:true}),

  getAgentsService: ( ) => axios.get('/agents', header, {auth:true}),

  getAgentByIdService: ( id ) => axios.get(`/agents/${id}`, header, {auth:true}),

};
