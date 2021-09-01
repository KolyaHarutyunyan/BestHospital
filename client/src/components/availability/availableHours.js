import React from "react";
import {AddModalButton} from '@eachbase/components';
import {editButtonStyle, serviceSingleStyles} from '../../fragments/client/clientSingle/core/styles';
import { availabilityStyles } from './styles'

export const AvailableHours = ({marginLeft}) => {
    const classes = availabilityStyles()

    return (
        <div className={classes.availableHours} style={{marginLeft: marginLeft ? marginLeft : '0'}}>
            <div className={classes.availableHoursHeader}>
                <p className={classes.availableHoursTitle}>Available Hours</p>
                <AddModalButton text='Edit' btnStyles={editButtonStyle}/>
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