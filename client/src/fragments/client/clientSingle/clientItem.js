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
import {clientActions} from "@eachbase/store";
import {Images} from "@eachbase/utils";
import {TableCell} from "@material-ui/core";
import { StaffHistory, StaffCredentials, StaffEmployment, StaffAccess, ClientGeneral} from "./core";
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


    console.log(data,'state')

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

    const datanot = [
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
            tabComponent: (<ClientGeneral data={data}/>)
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
            tabComponent: (<Notes data={datanot} items={notesItem} headerTitles={headerTitles}/>)
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
                title={data ? `${data?.firstName} ${data?.lastName}` : ''}
                parentLink='/client'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
            >
                <div style={{backgroundColor: 'white', padding: '20px'}}>
                    <TabsHeader data={data} editModal={true} activeTab={activeTab} />
                    <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
        </>
    );
}