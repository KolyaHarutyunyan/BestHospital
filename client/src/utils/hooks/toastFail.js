export const ToastFail = (fail) => {

    if (fail) {
        return (
            fail === 'CREATE_PAYCODE_GLOBAL' ? 'Something went wrong' :
            fail === 'EDIT_PAYCODE_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'CREATE_OVERTIME_SETTINGS_GLOBAL' ? 'Something went wrong' :
            fail === 'EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'DELETE_SERVICE_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'DELETE_CREDENTIAL_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'DELETE_DEPARTMENT_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'EDIT_CREDENTIAL_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'DELETE_JOB_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'EDIT_JOB_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'EDIT_SERVICE_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'EDIT_DEPARTMENT_BY_ID_GLOBAL' ? 'Something went wrong' :
            fail === 'CREATE_SERVICE_GLOBAL' ? 'Something went wrong' :
            fail === 'CREATE_CREDENTIAL_GLOBAL' ? 'Something went wrong' :
            fail === 'CREATE_DEPARTMENT_GLOBAL' ? 'Something went wrong' :
            fail === 'CREATE_JOB_GLOBAL' ? 'Something went wrong' :
            fail === 'CREATE_CREDENTIAL' ? 'Something went wrong' :
            fail === 'EDIT_CREDENTIAL_BY_ID' ? 'Something went wrong' :
            fail === 'DELETE_CREDENTIAL_BY_ID' ? 'Something went wrong' :
            fail === 'CREATE_GLOBAL_NOTE' ? 'Something went wrong' :
            fail === 'EDIT_GLOBAL_NOTE' ? 'Something went wrong' :
            fail === 'DELETE_GLOBAL_NOTE' ? 'Something went wrong' :
            fail === 'CREATE_ADMIN' ? 'Something went wrong' :
            fail === 'EDIT_ADMIN_BY_ID' ? 'Something went wrong' :
          
                fail === 'EDIT_PAYCODE_BY_ID_GLOBAL' ? 'Something went wrong' :
                    fail === 'CREATE_OVERTIME_SETTINGS_GLOBAL' ? 'Something went wrong' :
                        fail === 'EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Something went wrong' :
                            fail === 'DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Something went wrong' :
                                fail === 'CREATE_MILEAGE' ? 'Something went wrong' :
                                fail === 'EDIT_MILEAGE' ? 'Something went wrong' :
                                fail === 'CREATE_UPLOAD' ? 'Something went wrong' :
                                fail === 'CREATE_STAFF_SERVICE' ? 'Something went wrong' :
                                false

        )
    }
}