import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TableCell} from "@material-ui/core";
import {adminActions, systemActions} from "@eachbase/store";
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
    TableBodyComponent, Loader,
} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {staffStyle} from "@eachbase/pages/staff/styles";

export const StaffItem = () => {


    const dispatch = useDispatch()

    const params = useParams()

    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const [openCredModal, setOpenCredModal] = useState(false)
    const [credModalType, setCredModalType] = useState('')

    const [globalCredentialInformation,setGlobalCredentialInformation] = useState({})

    const classes = staffStyle()

    const staffGeneral = useSelector(state => state.admins.adminInfoById)
    const credentialData = useSelector(state => state.admins.credential)
    const globalCredentials = useSelector(state => state.system.credentials)
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
        }

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

    const openCloseCredModal = (modalType, globalCredentialInfo) => {
        setOpenCredModal(!openCredModal)
        setCredModalType(modalType)
        setGlobalCredentialInformation(globalCredentialInfo)
    }

    useEffect(() => {
        dispatch(adminActions.getCredential(params.id))
        dispatch(adminActions.getAdminById(params.id))
        dispatch(systemActions.getCredentialGlobal())
    }, [])

    const data = [
        {
            date: '06/11/2021',
            name: 'John Smith',
            subject: 'Service Request',
            action: <img src={Images.remove} alt="delete" style={{cursor: 'pointer'}} onClick={() => alert('click')}/>,
        }
    ]

    const notesItem = (item, index) => {
        return (
            <TableBodyComponent key={index}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>
                    {item.action}
                </TableCell>
            </TableBodyComponent>
        )
    }

    const {httpOnLoad} = useSelector((state) => ({
        adminsList: state.admins.adminsList,
        httpOnLoad: state.httpOnLoad
    }));

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
            tabComponent: (<StaffAvailability staffGeneral={staffGeneral}/>)
        },
        {
            tabComponent: (<Notes pagination={true} data={data} items={notesItem} headerTitles={headerTitles}/>)
        },
        {
            tabComponent: (<StaffHistory/>)
        },
    ];

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
                    <StaffItemHeader globalCredentialInformation={globalCredentialInformation} globalCredentials={globalCredentials} credModalType={credModalType}
                                     openCloseCredModal={openCloseCredModal} openCredModal={openCredModal}
                                     activeTab={activeTab}/>
                    <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}