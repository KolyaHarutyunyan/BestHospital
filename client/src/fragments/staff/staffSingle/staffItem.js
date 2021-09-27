import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TableCell} from "@material-ui/core";
import {
    adminActions,
    fundingSourceActions,
    httpRequestsOnSuccessActions,
    systemActions
} from "@eachbase/store";
import {
    StaffGeneral,
    StaffHistory,
    StaffCredentials,
    StaffEmployment,
    StaffAccess,
    StaffItemHeader,
    StaffAvailability
} from "./core";
import {Images} from "@eachbase/utils";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
    TableBodyComponent, Loader, SimpleModal, DeleteElement, NoItemText,
} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {staffStyle} from "@eachbase/pages/staff/styles";
import {noteActions} from "@eachbase/store/notes";
import moment from "moment";
import {httpRequestsOnLoadActions} from "../../../store/http_requests_on_load";
import {availabilityScheduleActions} from "@eachbase/store/availabilitySchedule";

export const StaffItem = () => {

    const dispatch = useDispatch()
    const params = useParams()
    const classes = staffStyle()

    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)
    const [openCredModal, setOpenCredModal] = useState(false)
    const [openDelModal, setOpenDelModal] = useState(false)
    const [credModalType, setCredModalType] = useState('')
    const [globalCredentialInformation, setGlobalCredentialInformation] = useState({})
    const [noteModalData, setNoteModalData] = useState({})

    const [noteModalInfo, setNoteModalInfo] = useState({
        right: '-1000px',
        created: '',
        subject: '',
    })

    const [noteModalTypeInfo, setNoteModalTypeInfo] = useState({})

    const [openModal, setOpenModal] = useState()

    const staffGeneral = useSelector(state => state.admins.adminInfoById)
    const credentialData = useSelector(state => state.admins.credential)
    const globalCredentials = useSelector(state => state.system.credentials)
    const globalNotes = useSelector(state => state.note.notes)
    const historiesData = useSelector(state => state.fundingSource.fundingSourceHistories)
    const availabilityData = useSelector(state => state.availabilitySchedule.availabilitySchedule)
    const handleOpenClose = () => {
        setOpen(!open)
    }

    const tabsLabels = [
        {
            label: 'General'
        },
        {
            label: 'Employment'
        },
        {
            label: 'Credentials & Clearances'
        },
        {
            label: 'Access'
        },
        {
            label: 'Availability'
        },
        {
            label: 'Notes'
        },
        {
            label: 'History'
        },

    ]

    const headerTitles = [
        {
            title: 'Date',
            sortable: true
        },
        {
            title: 'Creator Name',
            sortable: true
        },
        {
            title: 'Subject',
            sortable: false
        },
        {
            title: 'Action',
            sortable: false
        },
    ];

    const {httpOnLoad, httpOnSuccess} = useSelector((state) => ({
        httpOnSuccess: state.httpOnSuccess,
        httpOnLoad: state.httpOnLoad,
    }));

    const openCloseCredModal = (modalType, globalCredentialInfo) => {
        setOpenCredModal(!openCredModal)
        setCredModalType(modalType)
        setGlobalCredentialInformation(globalCredentialInfo)
    }

    useEffect(() => {
        dispatch(adminActions.getCredential(params.id))
        dispatch(adminActions.getAdminById(params.id))
        dispatch(systemActions.getCredentialGlobal())
        dispatch(noteActions.getGlobalNotes(params.id, 'Staff'))
        dispatch(fundingSourceActions.getFundingSourceHistoriesById(params.id, 'Staff'))
        dispatch(availabilityScheduleActions.getAvailabilitySchedule(params.id))
    }, [])

    const openNoteModal = (data) => {
        setNoteModalInfo({
            right: '25px',
            created: data?.created,
            subject: data?.subject,
            id: data?.id,
            text: data?.text
        })
    }

    const closeNoteModal = () => {
        setNoteModalInfo({
            right: '-1000px',
            created: '',
            subject: '',
            id: ''
        })
    }
    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index} handleClick={() => openNoteModal({
                created: item?.created,
                subject: item?.subject,
                id: item?.id,
                text: item?.text
            })}>
                <TableCell>{moment(item?.created).format('DD/MM/YYYY')}</TableCell>
                <TableCell>{`${item?.user?.firstName} ${item?.user?.lastName}`}</TableCell>
                <TableCell>{item?.subject}</TableCell>
                <TableCell>
                    <img src={Images.remove} alt="delete" style={{cursor: 'pointer'}} onClick={(e) => {
                        e.stopPropagation();
                        handleOpenCloseDel({id: item.id, deletedName: item.subject, text: item.text})
                    }}/>
                </TableCell>
            </TableBodyComponent>
        )
    }

    const handleOpenCloseNote = (data) => {
        setNoteModalTypeInfo(data)
        setOpenModal(!openModal)
        setNoteModalInfo({
            right: '-1000px',
            created: '',
            subject: '',
            id: ''
        })
    }

    const tabsContent = [
        {
            tabComponent: (httpOnLoad.length ? <Loader/> : <StaffGeneral staffGeneral={staffGeneral}/>)
        },
        {
            tabComponent: (<StaffEmployment/>)
        },
        {
            tabComponent: (<StaffCredentials credentialData={credentialData} openModal={openCloseCredModal}/>)
        },
        {
            tabComponent: (<StaffAccess/>)
        },
        {
            tabComponent: (<StaffAvailability availabilityData={availabilityData} staffGeneral={staffGeneral}/>)
        },
        {
            tabComponent: (globalNotes.length ? <Notes
                        model='Staff'
                        closeModal={closeNoteModal}
                        noteModalInfo={noteModalInfo}
                        showModal={true}
                        pagination={true}
                        data={globalNotes}
                        items={notesItem}
                        headerTitles={headerTitles}/>
                    :
                    <NoItemText text='No Items Yet'/>
            )
        },
        {
            tabComponent: (<StaffHistory data={historiesData}/>)
        },
    ];

    const handleOpenCloseDel = (data) => {
        setNoteModalData(data)
        setOpenDelModal(!openDelModal)
    }

    const handleDeleteNote = () => {
        dispatch(noteActions.deleteGlobalNote(noteModalData.id, params.id, 'Staff'))
        closeNoteModal()
    }


    const loader = httpOnLoad.length && httpOnLoad[0] === 'DELETE_GLOBAL_NOTE'

    const success = httpOnSuccess.length && httpOnSuccess[0].type === 'DELETE_GLOBAL_NOTE'

    useEffect(() => {
        if (success) {
            dispatch(httpRequestsOnSuccessActions.removeSuccess(httpOnSuccess.length && httpOnSuccess[0].type))
            dispatch(httpRequestsOnLoadActions.removeLoading(httpOnLoad.length && httpOnLoad[0].type))
            setOpenDelModal(false)
        }
    }, [success]);


    return (
        <>
            <TableWrapperGeneralInfo
                status='inactive'
                parent='Staff'
                title='Staff Member Name'
                parentLink='/staff'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
            >
                <div className={classes.staffSingleItem}>
                    <StaffItemHeader noteModalTypeInfo={noteModalTypeInfo} handleOpenClose={handleOpenCloseNote}
                                     openModal={openModal} globalCredentialInformation={globalCredentialInformation}
                                     globalCredentials={globalCredentials} credModalType={credModalType}
                                     openCloseCredModal={openCloseCredModal} openCredModal={openCredModal}
                                     activeTab={activeTab}/>
                    <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
                <SimpleModal
                    openDefault={openDelModal}
                    handleOpenClose={handleOpenCloseDel}
                    content={<DeleteElement loader={loader} text='some information' info={noteModalData?.deletedName}
                                            handleDel={handleDeleteNote} handleClose={handleOpenCloseDel}/>}
                />
            </TableWrapperGeneralInfo>
        </>
    );
}