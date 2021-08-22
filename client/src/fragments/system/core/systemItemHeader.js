import {DeleteElement, SimpleModal} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {SystemItemAddService} from "./modals";
import {systemItemStyles} from "./styles";
import React from "react";

export const SystemItemHeader = ({handleDeletedOpenClose, deletedId, deleteModalOpened, modalType, open ,handleOpenClose}) => {

    const classes = systemItemStyles()

    const deleteItem = ()=>{
        alert(deletedId)
    }

    return (
        <div className={[`${classes.systemHeaderStyles} ${classes.spaceBottom}`]}>
            <div className={classes.systemHeaderStyles}>
                <img src={Images.systemIcon} className={classes.systemIcon} alt="founding"/>
                <p className={classes.systemTitle}>System</p>
            </div>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={<SystemItemAddService modalType={modalType} handleClose={handleOpenClose}/>}
            />
            <SimpleModal
                openDefault={deleteModalOpened}
                handleOpenClose={handleDeletedOpenClose}
                content={<DeleteElement info={deletedId} handleDel={deleteItem} handleClose={handleDeletedOpenClose} />}
            />
        </div>
    )
}

