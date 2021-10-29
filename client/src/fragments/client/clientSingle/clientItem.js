import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
    SimpleModal,
    NoItemText, Loader,
} from "@eachbase/components";
import {clientActions, fundingSourceActions, httpRequestsOnSuccessActions} from "@eachbase/store";
import {
    ClientGeneral,
    ClientContact,
    TabsHeader,
    ClientEnrollment,
    ClientNotes,
    ClientAvailabilitySchedule,
    ClientHistory,
    ClientAuthorization,
} from "./core";
import {AddContact} from "../clientModals";
import {clientItemStyles} from "./styles";
import {noteActions} from "@eachbase/store/notes";
import {availabilityScheduleActions} from "@eachbase/store/availabilitySchedule";


export const ClientItem = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [contactId, setContactId] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const [authItemIndex, setAuthItemIndex] = useState(null)
    const [authActive, setAuthActive] = useState(false)
    const [getStatus, setGetStatus] = useState('')
    const [prevStatus, setPrevStatus] = useState('')
    const params = useParams()
    const classes = clientItemStyles()

    const {httpOnSuccess, httpOnError, httpOnLoad} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnError: state.httpOnError,
        httpOnLoad: state.httpOnLoad,
    }));
    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'GET_CLIENT_BY_ID'

    useEffect(() => {
        dispatch(clientActions.getClientsById(params.id))
        dispatch(clientActions.getClientsContacts(params.id))
        dispatch(clientActions.getClientsEnrollment(params.id))
        dispatch(clientActions.getClientsAuthorizations(params.id))
        dispatch(fundingSourceActions.getFundingSourceHistoriesById('Client'))
        dispatch(noteActions.getGlobalNotes(params.id, 'Client'))
        dispatch(availabilityScheduleActions.getAvailabilitySchedule(params.id))
        dispatch(fundingSourceActions.getFundingSource())
    }, []);

    useEffect(() => {
        dispatch(httpRequestsOnSuccessActions.removeSuccess("GET_CLIENT_BY_ID"))
    }, [success]);


    const data = useSelector(state => state.client.clientItemInfo)
    // const authItemData = useSelector(state => state.client.clientsAuthorizations[authItemIndex])
    const clientContactItem = useSelector(state => state.client.clientContacts[contactId])
    const clientContact = useSelector(state => state.client.clientContacts)
    const enrolments = useSelector(state => state.client.clientEnrollment)
    const clientsAuthorizations = useSelector(state => state.client.clientsAuthorizations)
    const clientsHistories = useSelector(state => state.fundingSource.fundingSourceHistories)
    const clientsNotes = useSelector(state => state.note.notes)
    const availabilityData = useSelector(state => state.availabilitySchedule.availabilitySchedule)

    const handleOpenClose = () => {
        setOpen(!open)
    }
    const handleOpenCloseModal = () => {
        setOpenModal(!openModal)
    }

    const tabsLabels = [
        {label: 'General'},
        {label: 'Contacts'},
        {label: 'Enrollments'},
        {label: 'Authorization'},
        {label: 'Availability'},
        {label: 'Notes'},
        {label: 'History'}
    ]

    const tabsContent = [
        {
            tabComponent: (httpOnLoad.length > 0 ? <Loader/> : <ClientGeneral data={data}/>)
        },
        {
            tabComponent: (clientContact.length ?
                <ClientContact info={clientContact}
                               data={data}
                               handleOpenClose={handleOpenCloseModal}
                               setContactId={setContactId}/> : <NoItemText text={'No Contacts Yet'}/>)
        },
        {
            tabComponent: (enrolments.length ? <ClientEnrollment info={enrolments} data={data}/> :
                <NoItemText text={'No Enrolments Yet'}/>)
        },
        {
            tabComponent: (clientsAuthorizations.length ?
                <ClientAuthorization info={clientsAuthorizations}
                                     setAuthItemIndex={setAuthItemIndex}
                                     setAuthActive={setAuthActive}
                                     data={data}/> : <NoItemText text={'No AuthorizationItem Yet'}/>)
        },
        {
            tabComponent: (<ClientAvailabilitySchedule data={data} availabilityData={availabilityData}/>)
        },
        {
            tabComponent: (clientsNotes.length ? <ClientNotes data={clientsNotes}/> :
                <NoItemText text={'No Notes  Yet'}/>)
        },
        {
            tabComponent: (clientsHistories.length ? <ClientHistory info={clientsHistories}/> :
                <NoItemText text={'No Histories  Yet'}/>)
        },
    ];


    return (
        <>
            <TableWrapperGeneralInfo
                parent='Clients'
                title={data ? `${data?.firstName} ${data?.lastName}` : ''}
                parentLink='/client'
                buttonsTabAddButton={true}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={
                    <InactiveModal
                        name={data?.firstName}
                        setGetStatus={setGetStatus}
                        prevStatus={prevStatus}
                        info={{
                            status: getStatus,
                            path: 'client',
                            type: 'GET_CLIENT_BY_ID_SUCCESS'
                        }} handleOpenClose={handleOpenClose}
                        handleClose={handleOpenClose}
                    />}
            >
                <SimpleModal
                    openDefault={openModal}
                    handleOpenClose={handleOpenCloseModal}
                    content={<AddContact info={clientContactItem} handleClose={handleOpenCloseModal}/>}
                />
                <div className={classes.headerWraperStyle}>
                    <TabsHeader
                        authActive={authActive}
                        data={data}
                        activeTab={activeTab}
                        status={data?.status}
                        type='GET_CLIENT_BY_ID_SUCCESS'
                        setGetStatus={setGetStatus}
                        getStatus={getStatus}
                        setPrevStatus={setPrevStatus}
                        handleOpen={handleOpenClose}
                    />
                    <SimpleTabs setAuthActive={setAuthActive}
                                setActiveTab={setActiveTab}
                                tabsLabels={tabsLabels}
                                tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}