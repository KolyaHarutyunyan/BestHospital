import React, {useState} from "react";
import {SimpleTabs} from "@eachbase/components";
import {SystemType, systemItemStyles, SystemItemHeader, Credentials, Departments} from './core';

export const SystemItem = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const classes = systemItemStyles()

    const [deleteModalOpened, setDeleteModalOpened] = useState(false)
    const [deletedId,setDeletedId] = useState('')

    const tabsLabels = [
        {
            label: 'Service Types'
        },
        {
            label: 'Credentials'
        },
        {
            label: 'Departments'
        }
    ]

    const handleOpenClose = (modalType) => {
        setModalType(modalType);
        setOpen(!open)
    }

    const handleDeletedOpenClose = () =>{
        setDeleteModalOpened(false)
    }

    const handleRemoveItem = (type) =>{
        setDeleteModalOpened(true)
        setDeletedId(type)
    }

    const tabsContent = [
        {
            tabComponent: (<SystemType removeItem={handleRemoveItem} openModal={handleOpenClose}/>)
        },
        {
            tabComponent: (<Credentials removeItem={handleRemoveItem} openModal={handleOpenClose} />)
        },
        {
            tabComponent: (<Departments removeItem={handleRemoveItem} openModal={handleOpenClose} />)
        }
    ];


    return (
        <div className={classes.systemItemWrapper}>
            <SystemItemHeader
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