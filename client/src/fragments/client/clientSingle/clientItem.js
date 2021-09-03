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
import {getClientsNotes} from "../../../store/client/client.action";


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
        dispatch(clientActions.getClientsContacts(params.id))
        dispatch(clientActions.getClientsEnrollment(params.id))
        dispatch(clientActions.getClientsAuthorizations(params.id))
        dispatch(clientActions.getClientHistories(params.id, 'Client'))
        dispatch(clientActions.getClientsNotes(params.id, 'Client'))
    }, []);

    const data = useSelector(state => state.client.clientItemInfo)
    const authItemData = useSelector(state => state.client.clientsAuthorizations[authItemIndex])

    const clientContactItem = useSelector(state => state.client.clientContacts[contactId])
    const clientContact = useSelector(state => state.client.clientContacts)
    const enrolments = useSelector(state => state.client.clientEnrollment)
    const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)
    const clientsHistories = useSelector(state => state.client.clientHistories)
    const clientsNotes = useSelector(state => state.client.clientsNotes)
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
            tabComponent: (<ClientContact info={clientContact} data={data} handleOpenClose={handleOpenCloseModal}
                                          setContactId={setContactId}/>)
        },
        {
            tabComponent: (<ClientEnrollment info={enrolments} data={data}/>)
        },
        {
            tabComponent: (!authActive ?
                <ClientAuthorization info={clientsAuthorizations} setAuthItemIndex={setAuthItemIndex}
                                     setAuthActive={setAuthActive} data={data}/> :
                <ClientAuthorizationItem data={authItemData}/>)
        },
        {
            tabComponent: (<ClientAvailabilitySchedule/>)
        },
        {
            tabComponent: (<ClientNotes info={clientsNotes} />)
        },
        {
            tabComponent: (<ClientHistory  info={clientsHistories} />)
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
                             handleOpenClose={handleOpenCloseModal}
                             content={<AddContact info={clientContactItem} handleClose={handleOpenCloseModal}/>}/>
                <div className={classes.headerWraperStyle}>
                    <TabsHeader authActive={authActive} data={data} activeTab={activeTab}/>
                    <SimpleTabs setAuthActive={setAuthActive} setActiveTab={setActiveTab} tabsLabels={tabsLabels}
                                tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}