import React, {useState} from "react";
import {AddModalButton, AvailabilitySchedule, SimpleModal} from '@eachbase/components';
import {editButtonStyle} from '../../fragments/client/clientSingle/core/styles';
import { availabilityStyles } from './styles'
import {AvailableHourseBox} from "../../fragments/client/clientSingle/core/availableHourseBox";

export const AvailableHours = ({onModel, availabilityData, marginLeft}) => {
    const [open, setOpen] = useState(false)

    const classes = availabilityStyles()
    const handleOpenClose = () => {
        setOpen(!open)
    }

    const shortDayNames = (name) => {
        switch (name) {
            case 'monday' :
                return 'Mon'
            case 'tuesday' :
                return 'tue'
            case 'wednesday' :
                return 'wed'
            case 'thursday' :
                return 'thu'
            case 'friday' :
                return 'fri'
            case 'saturday' :
                return 'sat'
            case 'sunday' :
                return 'sun'
        }
    }

    return (
        <div className={classes.availableHours} style={{marginLeft: marginLeft ? marginLeft : '0'}}>
            <SimpleModal openDefault={open} handleOpenClose={handleOpenClose} content={ <AvailabilitySchedule onModel={onModel} availabilityData={availabilityData} handleClose={handleOpenClose} /> } />
            <div className={classes.availableHoursHeader}>
                <p className={classes.availableHoursTitle}>Available Hours</p>
                <AddModalButton text='Edit' handleClick={handleOpenClose} btnStyles={editButtonStyle}/>
            </div>
            <div className={classes.availableHoursBlock}>
                {
                    availabilityData &&  Object.keys(availabilityData).map((item, index)=>{
                        return (
                            <AvailableHourseBox day={shortDayNames(item)} info={availabilityData[item]} />
                        )
                    })
                }

            </div>
        </div>


    )
}