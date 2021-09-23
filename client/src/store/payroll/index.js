import {
    createPayCodeGlobal,
    getPayCodeGlobal,
    editPayCodeByIdGlobal,
    deletePayCodeByIdGlobal,

    createOvertimeSettingsGlobal,
    getOvertimeSettingsGlobal,
    editOvertimeSettingsByIdGlobal,
    deleteOvertimeSettingsByIdGlobal,
} from "./payroll.action";

export {payrollReducer} from './payroll.reducer';
export {watchPayroll} from './payroll.saga';

export const payrollActions = {
    createPayCodeGlobal,
    getPayCodeGlobal,
    editPayCodeByIdGlobal,
    deletePayCodeByIdGlobal,

    createOvertimeSettingsGlobal,
    getOvertimeSettingsGlobal,
    editOvertimeSettingsByIdGlobal,
    deleteOvertimeSettingsByIdGlobal,
}