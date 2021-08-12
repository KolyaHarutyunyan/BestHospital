import {serviceSingleStyles, tabsHeaderStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {StaffAddNotes} from "@eachbase/fragments";
import {EditClient} from "@eachbase/fragments/client";
import {useDispatch, useSelector} from "react-redux";
import {clientActions} from "@eachbase/store";
import {useParams} from "react-router-dom";


const editButtonStyle = {
    height: 36,
    paddingInline: 24
}

export const TabsHeader = ({activeTab,  data}) => {

    const params = useParams()
    const classes = serviceSingleStyles()
    const [open, setOpen] = useState()
    const dispatch = useDispatch()



    useEffect(() => {

        if (activeTab === 1) {
             dispatch(clientActions.getClientsContacts(params.id))
        }
    }, [activeTab])


    const contacts = useSelector(state=> state.client)
    console.log(contacts,'contacts')

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
                        activeTab === 0 ? <AddModalButton btnStyles={editButtonStyle} handleClick={() => setOpen(true)}
                                                          text='Edit'/> : activeTab === 4 ?
                            <AddButton text='Add Note' handleClick={handleOpenClose}/> : null
                    }
                </li>
            </ul>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={activeTab === 0 ? <EditClient handleClose={handleOpenClose}/> : activeTab === 4 ?
                    <StaffAddNotes handleClose={handleOpenClose}/> : null}
            />
        </div>
    )
}