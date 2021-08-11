import {serviceSingleStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, AddModalButton, SimpleModal} from "@eachbase/components";
import React, {useState} from "react";
import {CreateStaff, StaffAddNotes} from "@eachbase/fragments";

const editButtonStyle = {
    height: 36,
    paddingInline: 24
}

export const StaffItemHeader = ({activeTab,}) => {
    const classes = serviceSingleStyles()
    const [open, setOpen] = useState()

    const handleOpenClose = () => {
        setOpen(!open)
    }

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
                        activeTab === 0 ? <AddModalButton btnStyles={editButtonStyle} handleClick={() => setOpen(true)} text='edit'/> : activeTab === 4 ? <AddButton
                            text='Add Note'
                            handleClick={handleOpenClose}/> : null
                    }
                </li>
            </ul>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={activeTab === 0 ?  <CreateStaff handleClose={handleOpenClose}/> : activeTab === 4 ? <StaffAddNotes handleClose={handleOpenClose} /> : null}
            />
        </div>
    )
}