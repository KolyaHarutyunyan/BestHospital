import axios from 'axios';
import { BASE_URL } from '../data';

export class AppointmentModule {
    static async createAppointment(appointment) {
        console.log(appointment, 'appointmenttttttttttttttttttttttt')
        const res = await axios.post(BASE_URL + 'appointment', appointment);
        return res.data;
    }
    static async editAppointment(appointment, id) {
        const res = await axios.patch(BASE_URL + `appointment/${id}`, appointment);
        return res.data;
    }
}
