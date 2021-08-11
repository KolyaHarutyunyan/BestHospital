import {tabsHeaderStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddModalButton, SimpleModal} from "@eachbase/components";
import React, {useState} from "react";
import {CreateStaff} from "@eachbase/fragments";

export const TabsHeader = ({ editModal, data}) => {
    const classes = tabsHeaderStyles()
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
                        <h1 className={classes.name}>{data ? `${data?.firstName} ${data?.lastName}`: ''}</h1>
                        <div className={classes.tagContent}>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                            <p>Tag Name</p>
                        </div>
                    </div>
                </li>
                <li>
                    <AddModalButton handleClick={() => setOpen(true)} text='edit'/>
                </li>
            </ul>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={ editModal ? <CreateStaff handleClose={handleOpenClose}/> : null}
            />
        </div>
    )
}