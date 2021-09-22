import React, {useState} from "react";
import {AddModalButton, SimpleModal} from '@eachbase/components';
import {editButtonStyle, serviceSingleStyles} from '../../fragments/client/clientSingle/core/styles';
import { availabilityStyles } from './styles'
import {AddAvailabilityScheduel} from "../../fragments/client/clientModals";
import {AvailableHourseBox} from "../../fragments/client/clientSingle/core/availableHourseBox";

export const AvailableHours = ({marginLeft}) => {
    const [open, setOpen] = useState(false)

    const classes = availabilityStyles()
    const handleOpenClose = () => {
        setOpen(!open)
    }

    let data =  {
        "monday": [{"from": "12:00", "to": "19:00", "available": true}, {"from": "14:00", "to": "17:00", "available": false}],
        "tuesday": [{"from": "12:00", "to": "18:00", "available": true}, {"from": "14:00", "to": "20:00", "available": false}]
    }


    return (
        <div className={classes.availableHours} style={{marginLeft: marginLeft ? marginLeft : '0'}}>
            <SimpleModal openDefault={open} handleOpenClose={handleOpenClose} content={ <AddAvailabilityScheduel handleClose={handleOpenClose} /> } />
            <div className={classes.availableHoursHeader}>
                <p className={classes.availableHoursTitle}>Available Hours</p>
                <AddModalButton text='Edit' handleClick={handleOpenClose} btnStyles={editButtonStyle}/>
            </div>
            <div className={classes.availableHoursBlock}>
                <AvailableHourseBox day={'MON'} info = {data.monday} />
                <AvailableHourseBox day={'TUE'} info = {data.tuesday} />
                <AvailableHourseBox day={'WED'} />
                <AvailableHourseBox day={'THU'} />
                <AvailableHourseBox day={'FRI'} />
                <AvailableHourseBox day={'SAT'} />
                <AvailableHourseBox day={'SUN'} />
            </div>
        </div>


    )
}