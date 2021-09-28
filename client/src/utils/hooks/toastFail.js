export const ToastFail = (fail) => {

    if (fail) {
        return (
            fail === 'CREATE_PAYCODE_GLOBAL' ? 'Something went wrong' :
                fail === 'EDIT_PAYCODE_BY_ID_GLOBAL' ? 'Something went wrong' :
                    fail === 'CREATE_OVERTIME_SETTINGS_GLOBAL' ? 'Something went wrong' :
                        fail === 'EDIT_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Something went wrong' :
                            fail === 'DELETE_OVERTIME_SETTINGS_BY_ID_GLOBAL' ? 'Something went wrong' :
                                false
        )
    }
}