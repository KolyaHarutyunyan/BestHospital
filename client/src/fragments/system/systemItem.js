import React, {useEffect, useState} from "react";
import {SimpleTabs} from "@eachbase/components";
import {
    ServiceType,
    systemItemStyles,
    SystemItemHeader,
    Credentials,
    Departments,
    JobTitles,
    PayrollSetup
} from './core';
import {useDispatch, useSelector} from "react-redux";
import {mileagesActions, systemActions} from "@eachbase/store";
import {payrollActions} from "@eachbase/store/payroll";

export const SystemItem = () => {

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
    const globalPayCodes = useSelector(state => state.payroll.PayCodes)
    const globalOvertimeSettings = useSelector(state => state.payroll.overtimeSettings)

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
        },
        {
            label: 'Payroll Setup'
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
        dispatch(payrollActions.getPayCodeGlobal())
        dispatch(payrollActions.getOvertimeSettingsGlobal())
        dispatch(mileagesActions.getMileages())
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
        },
        {
            tabComponent: (
                <PayrollSetup globalPayCodes={globalPayCodes} globalOvertimeSettings={globalOvertimeSettings}/>)
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
        </div>
    );
}