import React, {useState} from "react";
import {systemItemStyles} from "./styles";
import {Images} from "@eachbase/utils";
import {AddButton, SimpleModal} from "@eachbase/components";
import {SystemItemAddService} from "./modals";

export const SystemItemHeader = ({modalType, open ,handleOpenClose, activeTab}) => {

    const classes = systemItemStyles()

    return (
        <div className={[`${classes.systemHeaderStyles} ${classes.spaceBottom}`]}>
            <div className={classes.systemHeaderStyles}>
                <img src={Images.systemIcon} className={classes.systemIcon} alt="founding"/>
                <p className={classes.systemTitle}>System</p>
            </div>
            <SimpleModal
                openDefault={open}
                handleOpenClose={handleOpenClose}
                content={activeTab === 0 ? <SystemItemAddService modalType={modalType} handleClose={handleOpenClose}/> : null

                }
            />
            {activeTab === 0 ?
                <AddButton handleClick={()=> handleOpenClose('')} text='Add Service Type'/>
                : null
            }
        </div>
    )
}