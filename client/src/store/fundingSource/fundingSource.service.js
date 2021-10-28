import axios from "axios";

export const authService = {

    createFundingSourceService: (body) => axios.post('/funding', body),


    editFundingSourceService: (id, body) => axios.patch(`/funding/${id}`, body),

    getFundingSourceService: ({data}) => {
        if (data) {
            return axios.get(`/funding/?skip=${data.start}&&limit=${data.end}&&status=${data.status}`)
        } else {
            return axios.get('/funding')
        }
    },

    getFoundingSourceByIdService: (id) => axios.get(`/funding/${id}`,),

    getFoundingSourceServiceByIdService: (id) => axios.get(`/funding/${id}/service`),

    createFoundingSourceServiceByIdService: (id, body) => axios.post(`/funding/${id}/service`, body),

    editFoundingSourceServiceService: (id, body) => axios.patch(`/funding/service/${id}`, body),

    createFoundingSourceServiceModifierService: (body) => axios.post(`/modifier`, body),

    editFoundingSourceServiceModifierService: (id,body) => axios.patch(`/modifier/${id}`, body),

    getFoundingSourceServiceModifierService: (id) => axios.get(`/modifier/${id}`),

    getFundingSourceHistoriesByIdService: (onModal,searchDate) => {
        if(searchDate){
            return (
                axios.get(`/history/${onModal}?start=${searchDate}` )
            )
        }else {
            return (
                axios.get(`/history/${onModal}`)
            )
        }


    },

    // editActiveOrInactiveService: (id, path, status , body) => axios.patch(`/${path}/${id}/${status}`, body),

    setStatusService: (id, path, status , body) => axios.patch(`/${path}/${id}/setStatus?status=${status}`, body),

};
