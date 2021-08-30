import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal, SimpleModal,
} from "@eachbase/components";
import {clientActions} from "@eachbase/store";

import {
    ClientGeneral,
    ClientContact,
    TabsHeader,
    ClientEnrollment,
    ClientNotes,
    ClientAvailabilitySchedule,
    ClientHistory,
    ClientAuthorization, ClientAuthorizationItem
} from "./core";
import {useDispatch, useSelector} from "react-redux";
import {AddContact} from "../clientModals";
import {clientItemStyles} from "./styles";


export const ClientItem = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [contactId, setContactId] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [authItemIndex, setAuthItemIndex] = useState(null)
    const [authActive, setAuthActive] = useState(false)
    const params = useParams()
    const classes = clientItemStyles()
    useEffect(() => {
        dispatch(clientActions.getClientsById(params.id))
    }, []);

    const data = useSelector(state => state.client.clientItemInfo)
    const authItemData = useSelector(state => state.client.clientsAuthorizations[authItemIndex])
    console.log(authItemData, 'aaaaaauth')
    const clientContactItem = useSelector(state => state.client.clientContacts[contactId])

    const handleOpenClose = () => {
        setOpen(!open)
    }
    const handleOpenCloseModal = () => {
        setOpenModal(!openModal)
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
            tabComponent: (
                <ClientContact data={data} handleOpenClose={handleOpenCloseModal} setContactId={setContactId}/>)
        },
        {
            tabComponent: (<ClientEnrollment data={data}/>)
        },
        {
            tabComponent: (!authActive ?
                <ClientAuthorization setAuthItemIndex={setAuthItemIndex} setAuthActive={setAuthActive} data={data}/> :
                <ClientAuthorizationItem data={authItemData}/>)
        },
        {
            tabComponent: (<ClientAvailabilitySchedule/>)
        },
        {
            tabComponent: (<ClientNotes/>)
        },
        {
            tabComponent: (<ClientHistory/>)
        },
    ];

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
                <SimpleModal openDefault={openModal}
                             content={<AddContact info={clientContactItem} handleClose={handleOpenCloseModal}/>}/>
                <div className={classes.headerWraperStyle}>
                    <TabsHeader authActive={authActive}  data={data} activeTab={activeTab} />
                    <SimpleTabs setAuthActive={setAuthActive} setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}