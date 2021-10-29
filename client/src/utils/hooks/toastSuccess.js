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

            success === 'EDIT_FUNDING_SOURCE' ? 'Successfully edited Funding Source' :
            success === 'CREATE_FUNDING_SOURCE' ? 'Successfully create Funding Source' :
            success === 'CREATE_FUNDING_SOURCE_SERVICE_BY_ID' ? 'Successfully created Service' :
            success === 'EDIT_FUNDING_SOURCE_SERVICE' ? 'Successfully edited Service' :
            success === 'CREATE_CLIENT' ? 'Successfully created client' :
            success === 'DELETE_CLIENT' ? 'Successfully deleted client' :
            success === 'EDIT_CLIENT' ? 'Successfully edited client' :
            success === 'EDIT_CLIENT_CONTACT' ? 'Successfully edited contact' :
            success === 'CREATE_CLIENT_CONTACT' ? 'Successfully created contact' :
            success === 'DELETE_CLIENT_CONTACT' ? 'Successfully deleted contact' :
            success === 'EDIT_CLIENT_ENROLLMENT' ? 'Successfully edited enrollment' :
            success === 'DELETE_CLIENT_ENROLLMENT' ? 'Successfully deleted enrollment' :
            success === 'CREATE_CLIENT_ENROLLMENT' ? 'Successfully created enrollment' :
            success === 'EDIT_CLIENT_AUTHORIZATION' ? 'Successfully edited authorization' :
            success === 'CREATE_CLIENT_AUTHORIZATION' ? 'Successfully created authorization' :
            success === 'EDIT_CLIENT_AUTHORIZATION_SERV' ? 'Successfully edited Service' :
            success === 'CREATE_CLIENT_AUTHORIZATION_SERV' ? 'Successfully created Service' :
            success === 'DELETE_CLIENT_AUTHORIZATION' ? 'Successfully deleted authorization' :
            success === 'DELETE_CLIENT_AUTHORIZATION_SERV' ? 'Successfully deleted Service' :
            success === 'DELETE_CLIENT_AUTHORIZATION_SERV' ? 'Successfully deleted Service' :
            success === 'CREATE_EMPLOYMENT' ? 'Successfully created employment' :
            success === 'EDIT_EMPLOYMENT' ? 'Successfully edited employment' :
            success === 'CREATE_PAY_CODE' ? 'Successfully created pay code' :
            success === 'EDIT_PAY_CODE' ? 'Successfully edited pay code' :
            success === 'DELETE_STAFF_SERVICE' ? 'Successfully deleted service' :
            success === 'CREATE_STAFF_SERVICE' ? 'Successfully created service' :


            success === 'CREATE_ROLE' ? 'Role Was Created' :
            success === 'DELETE_ROLE' ? 'Role Was Deleted' :
            success === 'CREATE_MILEAGE' ? 'Successfully created Mileage' :
            success === 'EDIT_MILEAGE' ? 'Successfully edited Mileage' :
            success === 'DELETE_MILEAGE' ? 'Successfully deleted Mileage' :

            false
        )
    }
}
