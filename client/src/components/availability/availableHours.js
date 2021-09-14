import React, {useState} from "react";
import {AddModalButton, SimpleModal} from '@eachbase/components';
import {editButtonStyle, serviceSingleStyles} from '../../fragments/client/clientSingle/core/styles';
import { availabilityStyles } from './styles'
import {AddAvailabilityScheduel} from "../../fragments/client/clientModals";

export const AvailableHours = ({marginLeft}) => {
    const [open, setOpen] = useState(false)

    const classes = availabilityStyles()
    const handleOpenClose = () => {
        setOpen(!open)
    }
    return (
        <div className={classes.availableHours} style={{marginLeft: marginLeft ? marginLeft : '0'}}>
            <SimpleModal openDefault={open} handleOpenClose={handleOpenClose} content={ <AddAvailabilityScheduel handleClose={handleOpenClose} /> } />
            <div className={classes.availableHoursHeader}>
                <p className={classes.availableHoursTitle}>Available Hours</p>
                <AddModalButton text='Edit' handleClick={handleOpenClose} btnStyles={editButtonStyle}/>
            </div>
            <div className={classes.availableHoursBlock}>
                <div className={classes.availableHoursBox}>
                    <div className={classes.availableHoursBoxHeader}>
                        <p>MON</p>
                    </div>
                    <div className={classes.availableHoursBoxBody}>
                        <p className={classes.availableHoursBoxBodyInfo}>11:00 AM - 01:00 PM</p>
                        <p className={classes.availableHoursBoxBodyInfo}>02:00 PM - 03:00 PM</p>
                        <p className={classes.availableHoursBoxBodyInfo}>03:00 PM - 04:30 PM</p>
                    </div>
                </div>
            </div>
        </div>


    )
}