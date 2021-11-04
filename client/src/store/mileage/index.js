import {
    createMileage, deleteMileage, editMileage, getMileages
} from "./mileage.action";

export {mileageReducer} from './mileage.reducer';
export {watchMileage} from './mileage.saga';

export const mileagesActions = {
    /** Create, Edit Mileage */
    createMileage,
    editMileage,
    /** End */

    /** Get Mileage */
    getMileages,
    /** End */

    /** Delete Mileage */
    deleteMileage,
    /** End */
}

