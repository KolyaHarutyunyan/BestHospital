import axios from "axios";

export const noteService = {

    getGlobalNotesService: (id, onModel) => axios.get(`/comment/${id}/${onModel}`,),

    createGlobalNoteService: (body) => axios.post(`/comment`, body),

    editGlobalNoteService: (id, body) => axios.patch(`/comment/${id}`, body),

    deleteGlobalNoteService: (id) => axios.delete(`/comment/${id}/comments`,),

}