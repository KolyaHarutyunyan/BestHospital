import React, {useEffect} from "react";
import {DeleteElement, SimpleModal} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {SystemItemAddService} from "./modals";
import {systemItemStyles} from "./styles";
import {useDispatch, useSelector} from "react-redux";
import {httpRequestsOnSuccessActions, systemActions} from "../../../store";

export const SystemItemHeader = ({
                                     deletedName,
                                     modalInformation,
                                     handleDeletedOpenClose,
                                     deletedId,
                                     deleteModalOpened,
                                     modalType,
                                     open,
                                     handleOpenClose
                                 }) => {
    const dispatch = useDispatch()

    const classes = systemItemStyles()

    const deleteItem = () => {
        if (modalType === 'editService') {
            dispatch(systemActions.deleteServiceByIdGlobal(deletedId))
        } else if (modalType === 'editCredential') {
            dispatch(systemActions.deleteCredentialByIdGlobal(deletedId))
        } else if (modalType === 'editDepartment') {
            dispatch(systemActions.deleteDepartmentByIdGlobal(deletedId))
        } else if (modalType === 'editJobTitles') {
            dispatch(systemActions.deleteJobByIdGlobal(deletedId))
        }
    }


    const {httpOnLoad, httpOnSuccess} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
        httpOnError: state.httpOnError
    }));

    const success =
        httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_SERVICE_BY_ID_GLOBAL' ? true :
            httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CREDENTIAL_BY_ID_GLOBAL' ? true :
                httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_DEPARTMENT_BY_ID_GLOBAL' ? true :
                    httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_JOB_BY_ID_GLOBAL'


    const loader = httpOnLoad.length &&
    httpOnLoad[0] === 'DELETE_SERVICE_BY_ID_GLOBAL' ? true :
        httpOnLoad[0] === 'EDIT_CREDENTIAL_BY_ID_GLOBAL' ? true :
            httpOnLoad[0] === 'DELETE_CREDENTIAL_BY_ID_GLOBAL' ? true :
                httpOnLoad[0] === 'DELETE_DEPARTMENT_BY_ID_GLOBAL' ? true :
                    httpOnLoad[0] === 'DELETE_JOB_BY_ID_GLOBAL'

    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(httpOnSuccess.length && httpOnSuccess[0].type))
            handleDeletedOpenClose()
        }
    }, [success]);


    return (
        <div className={[`${classes.systemHeaderStyles} ${classes.spaceBottom}`]}>
            <div className={classes.systemHeaderStyles}>
                <img src={Images.systemIcon} className={classes.systemIcon} alt="founding"/>
                <p className={classes.systemTitle}>System</p>
            </div>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={<SystemItemAddService modalInformation={modalInformation} modalType={modalType}
                                               handleClose={handleOpenClose}/>}
            />
            <SimpleModal

                openDefault={deleteModalOpened}
                handleOpenClose={handleDeletedOpenClose}
                content={<DeleteElement loader={loader} text='some information' info={deletedName}
                                        handleDel={deleteItem} handleClose={handleDeletedOpenClose}/>}
            />
        </div>
    )
}

