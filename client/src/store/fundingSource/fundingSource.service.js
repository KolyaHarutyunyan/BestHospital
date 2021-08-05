import axios from "axios";

export const authService = {

    createFundingSourceService: (body) => axios.post('/funding', body),


    editFundingSourceService: (id,body) => axios.patch(`/funding/${id}`, body),

    getFundingSourceService: () => axios.get('/funding',),

    getFoundingSourceByIdService: (id) => axios.get(`/funding/${id}`,),

    getFoundingSourceServiceByIdService: (id) => axios.get(`/funding/${id}/service`),

    createFoundingSourceServiceByIdService: (id, body) => axios.post(`/funding/${id}/service`, body),

    createFoundingSourceServiceModifierService: (id, body) => axios.post(`/funding/${id}/modifier`, body),

    getFundingSourceHistoriesByIdService: (id) => axios.get(`/funding/${id}/histories`,),

    getFundingSourceServService: () => axios.get(`/service`,),

    createFundingSourceServService: (body) => axios.post(`/service`, body),

    getFundingSourceServByIdService: (id) => axios.post(`/service/${id}`, ),
};
