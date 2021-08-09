import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {
    SimpleTabs,
    Notes,
    TableWrapperGeneralInfo,
    InactiveModal,
    TabsHeader,
    TableBodyComponent
} from "@eachbase/components";
import {adminActions} from "@eachbase/store";
import {Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import {StaffGeneral, StaffHistory, StaffCredentials, StaffEmployment, StaffAccess} from "./core";
import {useDispatch, useSelector} from "react-redux";

export const ClientItem = () => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const params = useParams()

    useEffect(() => {
        dispatch(adminActions.getAdminById(params.id))
    }, []);

    const staffGeneral = useSelector(state => state.admins.adminInfoById)

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

    const data = [
        {
            date: '06/11/2021',
            name: 'John Smith',
            subject: 'Service Request',
            action: <img src={Images.remove} alt="delete" style={{ cursor: 'pointer'}} onClick={()=>alert(index)} />,
        }
    ]

    const notesItem = (item,index) => {
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
            tabComponent: (<StaffEmployment />)
        },
        {
            tabComponent: (<StaffCredentials />)
        },
        {
            tabComponent: (<StaffAccess />)
        },
        {
            tabComponent: (<Notes data={data} items={notesItem} headerTitles={headerTitles}/>)
        },
        {
            tabComponent: (<StaffHistory />)
        },
    ];

    // component

    return (
        <>
            <TableWrapperGeneralInfo
                status='inactive'
                parent='Clients'
                title='Alice'
                parentLink='/client'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
            >
                <div style={{backgroundColor: 'white', padding: '20px'}}>
                    <TabsHeader editModal={true} activeTab={activeTab} />
                    <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}