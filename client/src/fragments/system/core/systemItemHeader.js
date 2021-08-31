import {DeleteElement, SimpleModal} from "@eachbase/components";
import {Images} from "@eachbase/utils";
import {SystemItemAddService} from "./modals";
import {systemItemStyles} from "./styles";
import React from "react";
import {useDispatch} from "react-redux";
import {systemActions} from "../../../store";

export const SystemItemHeader = ({deletedName, modalInformation, handleDeletedOpenClose, deletedId, deleteModalOpened, modalType, open ,handleOpenClose}) => {
    const dispatch = useDispatch()

    const classes = systemItemStyles()
    const deleteItem = ()=>{
        dispatch(systemActions.deleteServiceByIdGlobal(deletedId))
        handleDeletedOpenClose()
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
                content={<SystemItemAddService modalInformation={modalInformation} modalType={modalType} handleClose={handleOpenClose}/>}
            />
            <SimpleModal
                openDefault={deleteModalOpened}
                handleOpenClose={handleDeletedOpenClose}
                content={<DeleteElement info={deletedName} handleDel={deleteItem} handleClose={handleDeletedOpenClose} />}
            />
        </div>
    )
}

