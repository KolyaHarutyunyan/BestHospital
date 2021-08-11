import React, {useState} from "react";
import {SimpleTabs} from "@eachbase/components";
import {SystemType, systemItemStyles, SystemItemHeader} from './core';

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
            label: 'Tab item'
        },
        {
            label: 'Tab item'
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
            tabComponent: (<p>tab item</p>)
        },
        {
            tabComponent: (<p>tab item</p>)
        }
    ];

    return (
        <div className={classes.systemItemWrapper}>
            <SystemItemHeader modalType={modalType} open={open} handleOpenClose={handleOpenClose} activeTab={activeTab}/>
            <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
        </div>
    );
}