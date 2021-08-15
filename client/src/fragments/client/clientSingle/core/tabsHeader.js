import {serviceSingleStyles, tabsHeaderStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {StaffAddNotes} from "@eachbase/fragments";
import {EditClient,AddContact} from "@eachbase/fragments/client";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";
import {useParams} from "react-router-dom";



const editButtonStyle = {
    height: 36,
    paddingInline: 24
}

export const TabsHeader = ({activeTab, data}) => {

    const params = useParams()
    const classes = serviceSingleStyles()
    const [open, setOpen] = useState()
    const dispatch = useDispatch()


    useEffect(() => {

        if (activeTab === 1) {

        }
        switch (activeTab) {
            case 1 :  dispatch(clientActions.getClientsContacts(params.id))
            case 2 :  dispatch(clientActions.getClientsEnrollment(params.id))
        }
    }, [activeTab])


    const contacts = useSelector(state => state.client)

    const handleOpenClose = () => {
        setOpen(!open)
    }

    return (
        <div>
            <ul className={classes.tabsWrapper}>
                <li>
                    <img src={Images.userProfile} alt="avatar" className={classes.avatar}/>
                    <div className={classes.nameContent}>
                        <h1 className={classes.name}>{data ? `${data?.firstName} ${data?.lastName}` : ''}</h1>
                        <div className={classes.tagContent}>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                        </div>
                    </div>
                </li>
                <li>
                    {
                        activeTab === 0 ?
                            <AddModalButton btnStyles={editButtonStyle}
                                            handleClick={() => setOpen(true)}
                                            text='Edit'/> :
                            activeTab !== 6 ?
                                <AddButton text={activeTab === 1 ? 'Add Contact' :
                                    activeTab === 2 ? 'Add Enrollments' :
                                        activeTab === 3 ? 'Add Authorization' :
                                            activeTab === 4 ? 'Add Availability Schedule' : 'Add Notes'
                                } handleClick={handleOpenClose}/> : null
                    }
                </li>
            </ul>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={activeTab === 0 ? <EditClient handleClose={handleOpenClose}/> :
                    activeTab === 1 ?
                       <AddContact />:
                        activeTab === 2 ?
                            <p>add Enrollment</p> :
                            activeTab === 3 ?
                                <p>add Auth</p> :
                                activeTab === 4 ?
                                    <p>add availab</p> :
                                    activeTab === 5 ?
                                        <p>add notes</p> : null
                }
            />
        </div>
    )
}