import React, {useState} from "react";
import {SimpleTabs} from "@eachbase/components";
import {SystemType, systemItemStyles, SystemItemHeader, Credentials, Departments} from './core';

export const SystemItem = () => {
    const [activeTab, setActiveTab] = useState(0)
    const [open, setOpen] = useState(false)
    const [modalType, setModalType] = useState('')
    const classes = systemItemStyles()

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

    const tabsContent = [
        {
            tabComponent: (<SystemType openModal={handleOpenClose}/>)
        },
        {
            tabComponent: (<Credentials openModal={handleOpenClose} />)
        },
        {
            tabComponent: (<Departments openModal={handleOpenClose} />)
        }
    ];

    return (
        <div className={classes.systemItemWrapper}>
            <SystemItemHeader modalType={modalType} open={open} handleOpenClose={handleOpenClose} activeTab={activeTab}/>
            <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
        </div>
    );
}