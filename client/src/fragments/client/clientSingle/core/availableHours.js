import React from "react";
import {AddModalButton, Card,} from '@eachbase/components';
import {serviceSingleStyles} from './styles';
import {Colors, Images} from "@eachbase/utils";


const editButtonStyle = {
    height: 36,
    paddingInline: 24,
}
export const AvailableHours = ({data,}) => {
    const classes = serviceSingleStyles()


    return (


            <div className={classes.availableHours}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16}}>
                    <p className={classes.availableHoursTitle}>Available Hours</p>
                    <AddModalButton text='Edit' btnStyles={editButtonStyle}/>
                </div>
                <div style={{display: 'flex', flexWrap: "wrap"}}>
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