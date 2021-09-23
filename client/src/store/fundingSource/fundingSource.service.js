import axios from "axios";
import {deleteFoundingSourceServiceById, editActiveOrInactive} from "./fundingSource.action";

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

    deleteFoundingSourceServiceByIdService: (id) => axios.delete(`/funding/${id}/`,),


    createFoundingSourceServiceModifierService: (body) => axios.post(`/modifier`, body),

    editFoundingSourceServiceModifierService: (id,body) => axios.patch(`/modifier/${id}`, body),

    getFoundingSourceServiceModifierService: (id) => axios.get(`/modifier/${id}`),


    getFundingSourceHistoriesByIdService: (id, onModal) => axios.get(`/history/${id}/${onModal}`,),

    getFundingSourceNotesService: (id, onModal) => axios.get(`/comment/${id}/${onModal}`,),

    createFoundingSourceNoteService: (body) => axios.post(`/comment`, body),

    editFoundingSourceNoteService: (id, body) => axios.patch(`/comment/${id}`, body),

    deleteFoundingSourceNoteService: (id) => axios.delete(`/comment/${id}/comments`,),


    editActiveOrInactiveService: (id, path, status , body) => axios.patch(`/${path}/${id}/${status}`, body),





    // getFundingSourceServService: () => axios.get(`/service`,),
    //
    // createFundingSourceServService: (body) => axios.post(`/service`, body),
    //
    // getFundingSourceServByIdService: (id) => axios.post(`/service/${id}`, ),
};
