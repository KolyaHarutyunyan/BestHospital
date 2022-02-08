import axios from "axios";

export const postingService = {
   getPostingsService: () => axios.get("/posting"),

   getPostingByIdService: (id) => axios.get(`/posting/${id}`),

   createPostingService: (body) => axios.post("/posting", body, { auth: true }),

   editPostingService: (id, body) => axios.patch(`/posting/${id}`, body),

   deletePostingService: (id) => axios.delete(`/posting/${id}`),
};
