import React from "react";
import {AddModalButton} from '@eachbase/components';
import {editButtonStyle, serviceSingleStyles} from './styles';


export const AvailableHours = () => {
    const classes = serviceSingleStyles()


    return (
        <div className={classes.availableHours}>
            <div className={classes.availableHoursHedaer}>
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
                        <p className={classes.availableHoursBoxBodyInfo}>11:00 AM - 01:00 PM</p>
                        <p className={classes.availableHoursBoxBodyInfo}>11:00 AM - 01:00 PM</p>
                    </div>
                </div>
            </div>
        </div>


    )
}