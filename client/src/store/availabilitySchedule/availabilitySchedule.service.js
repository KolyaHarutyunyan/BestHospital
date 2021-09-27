import axios from "axios";

export const availabilityScheduleService = {

    getAvailabilityScheduleService: (id) => axios.get(`/availability/${id}`),

    createAvailabilityScheduleService: (action) =>  axios.post(`/availability/${action.payload.id}/${action.payload.onModel}`, action.payload.data),

}