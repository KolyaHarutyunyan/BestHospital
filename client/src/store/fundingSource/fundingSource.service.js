import axios from "axios";

export const authService = {

  createFundingSourceService: ( body ) => axios.post('/funding', body),

  getFundingSourceService: ( ) => axios.get('/funding',  ),

  getFoundingSourceById: (id)=> axios.get(`/funding/${id}`,)

};
