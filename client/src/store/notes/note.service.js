import axios from "axios";

export const noteService = {

    getGlobalNotesService: (id, onModel) => axios.get(`/comment/${id}/${onModel}`, {auth:true}),

    createGlobalNoteService: (body) => axios.post(`/comment`, body, {auth:true}),

    editGlobalNoteService: (id, body) => axios.patch(`/comment/${id}`, body, {auth:true}),

    deleteGlobalNoteService: (id) => axios.delete(`/comment/${id}/comments`, {auth:true}),

}