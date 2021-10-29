import axios from "axios";

export const authService = {
    /** Create, Edit Mileage */

    createMileageService: (body) => axios.post('/mileage', body ),

    editMileageService: (id, body) => axios.patch(`/mileage/${id}`, body ),

    /** End */

    /** Get Mileages */

    getMileagesService: () => axios.get('/mileage' ),


    /** End */

    /** Delete Mileage */

    deleteMileageService: (id) => axios.delete(`/mileage/${id}` ),


    /** End */

};
