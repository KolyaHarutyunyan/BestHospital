import axios from "axios";

export const authService = {
    /** Create, Edit Mileage */

    createMileageService: (body) => axios.post('/mileage', body, {auth:true} ),

    editMileageService: (id, body) => axios.patch(`/mileage/${id}`, body, {auth:true} ),

    /** End */

    /** Get Mileages */

    getMileagesService: () => axios.get('/mileage', {auth:true} ),


    /** End */

    /** Delete Mileage */

    deleteMileageService: (id) => axios.delete(`/mileage/${id}`, {auth:true} ),


    /** End */

};
