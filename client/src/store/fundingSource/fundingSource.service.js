import axios from "axios";

export const authService = {

  createFundingSourceService: ( body ) => axios.post('/fundingSource', body),

  getFundingSourceService: ( ) => axios.get('/fundingSource',  ),

};
