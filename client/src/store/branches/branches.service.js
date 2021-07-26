import axios from "axios";

export const authService = {

  createBranchService: ( body ) => axios.post('/branches', body),

  getBranchesService: ( ) => axios.get('/branches',  ),

};
