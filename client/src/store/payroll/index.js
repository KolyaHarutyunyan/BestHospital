import {
    createPayCodeGlobal,
    getPayCodeGlobal,
    editPayCodeByIdGlobal,
    deletePayCodeByIdGlobal,
} from "./payroll.action";

export {payrollReducer} from './payroll.reducer';
export {watchPayroll} from './payroll.saga';

export const payrollActions = {
    createPayCodeGlobal,
    getPayCodeGlobal,
    editPayCodeByIdGlobal,
    deletePayCodeByIdGlobal,
}