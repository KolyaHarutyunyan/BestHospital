import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
} from "@eachbase/components";
import {clientActions} from "@eachbase/store";

import {  ClientGeneral, ClientContact,TabsHeader} from "./core";
import {useDispatch, useSelector} from "react-redux";

export const ClientItem = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const params = useParams()

    useEffect(() => {
        dispatch(clientActions.getClientsById(params.id))
    }, []);

    const data = useSelector(state => state.client.clientItemInfo)



    const handleOpenClose = () => {
        setOpen(!open)
    }

    const tabsLabels = [
        {
            label: 'General'
        },
        {
            label: 'Contacts'
        },
        {
            label: 'Enrollments'
        },
        {
            label: 'Authorization'
        },
        {
            label: 'Availability Schedule'
        },
        {
            label: 'Notes'
        },
        {
            label: 'History'
        }

    ]

    const tabsContent = [
        {
            tabComponent: (<ClientGeneral data={data}/>)
        },
        {
            tabComponent: ( <ClientContact data={data} /> )
        },
        {
            tabComponent: ( <ClientContact data={data} />)
        },
        {
            tabComponent: (<ClientContact />)
        },
        {
            tabComponent: (<ClientContact />)
        },
        {
            tabComponent: (<ClientContact />)
        },
    ];

    // component

    return (
        <>
            <TableWrapperGeneralInfo
                status='inactive'
                parent='Clients'
                title={data ? `${data?.firstName} ${data?.lastName}` : ''}
                parentLink='/client'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
            >
                <div style={{backgroundColor: 'white', padding: '20px'}}>
                    <TabsHeader data={data}  activeTab={activeTab} />
                    <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}