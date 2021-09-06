import React, {useEffect, useState} from "react";
import {SimpleTabs, Toast} from "@eachbase/components";
import {ServiceType, systemItemStyles, SystemItemHeader, Credentials, Departments, JobTitles} from './core';
import {useDispatch, useSelector} from "react-redux";
import {httpRequestsOnSuccessActions, systemActions} from "../../store";

export const SystemItem = () => {
    const {httpOnSuccess} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
        httpOnError: state.httpOnError
    }));

    const success =
        httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_SERVICE_BY_ID_GLOBAL' ? true :
            httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CREDENTIAL_BY_ID_GLOBAL' ? true :
                httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_DEPARTMENT_BY_ID_GLOBAL' ? true :
                    httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CREDENTIAL_BY_ID_GLOBAL' ? true :
                        httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_JOB_BY_ID_GLOBAL' ? true :
                            httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_JOB_BY_ID_GLOBAL' ? true :
                                httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_SERVICE_BY_ID_GLOBAL' ? true :
                                    httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_DEPARTMENT_BY_ID_GLOBAL'


    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(httpOnSuccess.length && httpOnSuccess[0].type))
        }
    }, [success]);

    const errorText = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_SERVICE_BY_ID_GLOBAL' ? true :
        httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_CREDENTIAL_BY_ID_GLOBAL' ? true :
            httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_DEPARTMENT_BY_ID_GLOBAL' ? true :
                httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_CREDENTIAL_BY_ID_GLOBAL' ? true :
                    httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_JOB_BY_ID_GLOBAL' ? true :
                        httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_JOB_BY_ID_GLOBAL' ? true :
                            httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_SERVICE_BY_ID_GLOBAL' ? true :
                                httpOnSuccess.length && httpOnSuccess[0].type === 'EDIT_DEPARTMENT_BY_ID_GLOBAL'
    let errorMessage = success ? 'success' : 'error'


    const [activeTab, setActiveTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [modalInformation, setModalInformation] = useState('')
    const [deletedName, setDeletedName] = useState()

    const classes = systemItemStyles()

    const globalCredentials = useSelector(state => state.system.credentials)
    const globalServices = useSelector(state => state.system.services)
    const globalDepartments = useSelector(state => state.system.departments)
    const globalJobs = useSelector(state => state.system.jobs)

    const dispatch = useDispatch()
    const [deleteModalOpened, setDeleteModalOpened] = useState(false)
    const [deletedId, setDeletedId] = useState('')

    const tabsLabels = [
        {
            label: 'Service Types'
        },
        {
            label: 'Credentials'
        },
        {
            label: 'Departments'
        },
        {
            label: 'Job Titles'
        }
    ]

    const handleOpenClose = (modalType, modalInformation) => {
        setModalType(modalType);
        setModalInformation(modalInformation)
        setOpen(!open)
    }

    const handleDeletedOpenClose = () => {
        setDeleteModalOpened(false)
    }

    const handleRemoveItem = (data) => {
        setDeleteModalOpened(true)
        setDeletedId(data.id)
        setDeletedName(data.name)
        setModalType(data.type);
    }

    useEffect(() => {
        dispatch(systemActions.getCredentialGlobal())
        dispatch(systemActions.getServices())
        dispatch(systemActions.getDepartments())
        dispatch(systemActions.getJobs())
    }, [])

    const tabsContent = [
        {
            tabComponent: (<ServiceType globalServices={globalServices} removeItem={handleRemoveItem}
                                        openModal={handleOpenClose}/>)
        },
        {
            tabComponent: (<Credentials globalCredentials={globalCredentials} removeItem={handleRemoveItem}
                                        openModal={handleOpenClose}/>)
        },
        {
            tabComponent: (<Departments globalDepartments={globalDepartments} removeItem={handleRemoveItem}
                                        openModal={handleOpenClose}/>)
        },
        {
            tabComponent: (
                <JobTitles globalJobs={globalJobs} removeItem={handleRemoveItem} openModal={handleOpenClose}/>)
        }
    ];

    return (
        <div className={classes.systemItemWrapper}>
            <SystemItemHeader
                deletedName={deletedName}
                modalInformation={modalInformation}
                deletedId={deletedId}
                deleteModalOpened={deleteModalOpened}
                handleDeletedOpenClose={handleDeletedOpenClose}
                modalType={modalType}
                open={open}
                handleOpenClose={handleOpenClose}
                activeTab={activeTab}/>
            <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>


            <Toast
                type={success ? 'success' : errorText ? 'error' : ''}
                text={errorMessage}
                info={success ? success : errorText ? errorText : ''}/>
        </div>
    );
}