import React, {useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory, useParams} from "react-router-dom";
import {SimpleTabs, Card, Notes, TableWrapperGeneralInfo, InactiveModal} from "@eachbase/components";
import {adminActions, officeActions} from "@eachbase/store";
import {StaffGeneral, StaffHistory, StaffCredentials, StaffEmployment, StaffAccess} from "./core";
import {useDispatch, useSelector} from "react-redux";
import {Images} from "@eachbase/utils";

export const StaffItem = ({general}) => {
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const params = useParams()

    useEffect(() => {
        dispatch(adminActions.getAdminById(params.id))
    }, []);

    const {adminInfoById} = useSelector((state) => ({
            adminInfoById: state.admins.adminInfoById
        })
    )
    const staffGeneral = useSelector(state => state.admins.adminInfoById)

    // const {officeById} = useSelector((state)=>({
    //         officeById: state.offices.officeById,
    //     })
    // )
    const handleOpenClose = () => {
        setOpen(!open)
    }

    // component

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

    const bodyTitles = [
        {
            title: '06/11/2021',
        },
        {
            title: 'John Smith',
        },
        {
            title: 'Service Request',
        },
        {
            title: (<img src={Images.remove} alt=""/>),
        }
    ]

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
            tabComponent: (<Notes bodyTitles={bodyTitles} headerTitles={headerTitles}/>)
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
                parent='Staff'
                title='Staff Member Name'
                parentLink='/staff'
                buttonsTabAddButton={true}
                activeInactiveText={'Inactive'}
                openCloseInfo={open}
                handleOpenClose={handleOpenClose}
                body={<InactiveModal handleOpenClose={handleOpenClose} handleClose={handleOpenClose}/>}
            >
                <div style={{backgroundColor: 'white', padding: '20px'}}>
                    <SimpleTabs setActiveTab={setActiveTab} tabsLabels={tabsLabels} tabsContent={tabsContent}/>
                </div>
            </TableWrapperGeneralInfo>
            {/*// : (<OfficesInfo info={officeById}/>)*/}
        </>
    );
}