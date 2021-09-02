import {serviceSingleStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal} from "@eachbase/components";
import React, {useEffect, useState} from "react";
import {CreateStaff, StaffAddNotes, CredentialModal} from "@eachbase/fragments";
import {adminActions} from "../../../../store";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";

const editButtonStyle = {
    height: 36,
    paddingInline: 24
}

export const StaffItemHeader = ({credModalType, openCloseCredModal, openCredModal, activeTab,}) => {

    const classes = serviceSingleStyles()
    const [open, setOpen] = useState()

    const handleOpenClose = () => {
        setOpen(!open)
    }

    const {adminInfoById} = useSelector((state)=>({
            adminInfoById: state.admins.adminInfoById
        })
    )

    return (
        <div>
            <ul className={classes.tabsWrapper}>
                <li>
                    <img src={Images.userProfile} alt="avatar" className={classes.avatar}/>
                    <div className={classes.nameContent}>
                        <h1 className={classes.name}>Alice Johnson</h1>
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
                            <AddModalButton btnStyles={editButtonStyle} handleClick={() => setOpen(true)}
                                            text='edit'/> : activeTab === 2 ?
                            <AddButton text='Add Credential'
                                       handleClick={() => openCloseCredModal('addCredential')}/> : activeTab === 5 ?
                                <AddButton text='Add Note' handleClick={handleOpenClose}/> : null
                    }
                </li>
            </ul>
            <SimpleModal
                openDefault={activeTab === 2 ? openCredModal : open}
                handleOpenClose={activeTab === 2 ? () => openCloseCredModal() : handleOpenClose}
                content={activeTab === 0 ?
                    <CreateStaff staffGeneral={adminInfoById}
                                 resetData={false} handleClose={handleOpenClose}/> : activeTab === 2 ?
                        <CredentialModal credModalType={credModalType}
                                         handleClose={() => openCloseCredModal()}/> : activeTab === 5 ?
                            <StaffAddNotes handleClose={handleOpenClose}/> : null}
            />
        </div>
    )
}