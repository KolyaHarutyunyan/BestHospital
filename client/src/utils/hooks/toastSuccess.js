export const ToastSuccess = (success) => {

    if (success) {
        return (
            success === 'CREATE_PAYCODE_GLOBAL' ? 'Successfully added payCode type' :
            success === 'EDIT_PAYCODE_BY_ID_GLOBAL' ? 'Successfully edited payCode type' :
            success === 'CREATE_OVERTIME_SETTINGS_GLOBAL' ? 'Successfully added overtime settings' :
            success === 'EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Successfully edited overtime settings' :
            success === 'DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Successfully deleted overtime settings' :
            success === 'DELETE_SERVICE_BY_ID_GLOBAL' ? 'Successfully deleted service settings' :
            success === 'DELETE_CREDENTIAL_BY_ID_GLOBAL' ? 'Successfully deleted credential settings' :
            success === 'DELETE_DEPARTMENT_BY_ID_GLOBAL' ? 'Successfully deleted department settings' :
            success === 'EDIT_CREDENTIAL_BY_ID_GLOBAL' ? 'Successfully edited credential settings' :
            success === 'DELETE_JOB_BY_ID_GLOBAL' ? 'Successfully deleted job settings' :
            success === 'EDIT_JOB_BY_ID_GLOBAL' ? 'Successfully edited job settings' :
            success === 'EDIT_SERVICE_BY_ID_GLOBAL' ? 'Successfully edited service settings' :
            success === 'EDIT_DEPARTMENT_BY_ID_GLOBAL' ? 'Successfully edited department settings' :
            success === 'CREATE_SERVICE_GLOBAL' ? 'Successfully added service settings' :
            success === 'CREATE_CREDENTIAL_GLOBAL' ? 'Successfully added credential settings' :
            success === 'CREATE_DEPARTMENT_GLOBAL' ? 'Successfully added department settings' :
            success === 'CREATE_JOB_GLOBAL' ? 'Successfully added job settings' :
            success === 'CREATE_CREDENTIAL' ? 'Successfully added credential' :
            success === 'EDIT_CREDENTIAL_BY_ID' ? 'Successfully edited credential' :
            success === 'DELETE_CREDENTIAL_BY_ID' ? 'Successfully deleted credential' :
            success === 'CREATE_GLOBAL_NOTE' ? 'Successfully added note' :
            success === 'EDIT_GLOBAL_NOTE' ? 'Successfully edited note' :
            success === 'DELETE_GLOBAL_NOTE' ? 'Successfully delete note' :
            success === 'CREATE_ADMIN' ? 'Successfully added admin' :
            success === 'EDIT_ADMIN_BY_ID' ? 'Successfully edited admin' :
            success === 'CREATE_AVAILABILITY_SCHEDULE_GLOBAL' ? 'Successfully edited availability schedule' :
            false
        )
    }
}
