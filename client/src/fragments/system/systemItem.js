import React, {useEffect, useState} from "react";
import {SimpleTabs} from "@eachbase/components";
import {ServiceType, systemItemStyles, SystemItemHeader, Credentials, Departments, JobTitles} from './core';
import {useDispatch, useSelector} from "react-redux";
import {systemActions} from "../../store";

export const SystemItem = () => {

    const [activeTab, setActiveTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const [modalId, setModalId] = useState('')
    const classes = systemItemStyles()

    const globalCredentials = useSelector(state => state.system.credentials)
    const globalServices = useSelector(state => state.system.services)

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

    const handleOpenClose = (modalType, modalId) => {
        setModalType(modalType);
        setModalId(modalId)
        setOpen(!open)
    }

    const handleDeletedOpenClose = () => {
        setDeleteModalOpened(false)
    }

    const handleRemoveItem = (type) => {
        setDeleteModalOpened(true)
        setDeletedId(type)
    }

    useEffect(() => {
        dispatch(systemActions.getCredential())
        dispatch(systemActions.getServices())
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
            tabComponent: (<Departments removeItem={handleRemoveItem} openModal={handleOpenClose}/>)
        },
        {
            tabComponent: (<JobTitles removeItem={handleRemoveItem} openModal={handleOpenClose}/>)
        }
    ];


    return (
        <div className={classes.systemItemWrapper}>
            <SystemItemHeader
                modalId={modalId}
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