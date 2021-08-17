import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {TableCell} from "@material-ui/core";
import {adminActions} from "@eachbase/store";
import {StaffGeneral, StaffHistory, StaffCredentials, StaffEmployment, StaffAccess, StaffItemHeader} from "./core";
import {Images} from "@eachbase/utils";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
    TableBodyComponent,
} from "@eachbase/components";
import {useDispatch, useSelector} from "react-redux";
import {staffStyle} from "@eachbase/pages/staff/styles";

export const StaffItem = () => {

    const credentialData = useSelector(state => state.admins.credentialById)
    const dispatch = useDispatch()

    const params = useParams()


    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const [openCredModal, setOpenCredModal] = useState(false)
    const [credModalType, setCredModalType] = useState('')

    const classes = staffStyle()

    const staffGeneral = useSelector(state => state.admins.adminInfoById)

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

    const openCloseCredModal = (modalType) => {
        setOpenCredModal(!openCredModal)
        setCredModalType(modalType)
    }

    useEffect(() => {
        dispatch(adminActions.getCredentialById(params.id))
        dispatch(adminActions.getAdminById(params.id))
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

    const tabsContent = [
        {
            tabComponent: (<StaffGeneral staffGeneral={staffGeneral}/>)
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
                    <StaffItemHeader credModalType={credModalType} openCloseCredModal={openCloseCredModal} openCredModal={openCredModal} activeTab={activeTab}/>
                    <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}