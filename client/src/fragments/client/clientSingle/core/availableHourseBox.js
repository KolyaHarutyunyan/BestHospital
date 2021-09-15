import React from "react";
import {availabilityStyles} from "@eachbase/components/availability/styles";



export const AvailableHourseBox = ({day, info}) => {

    const classes = availabilityStyles()
    return (
                <div className={classes.availableHoursBox}>
                    <div className={classes.availableHoursBoxHeader}>
                        <p>{day}</p>
                    </div>
                    <div className={classes.availableHoursBoxBody}>
                        {info && info.length && info.map((item,index)=>{
                            return(
                                <p className={classes.availableHoursBoxBodyInfo}>{`${item.from} - ${item.to}`} </p>
                            )
                        })}
                        {/*<p className={classes.availableHoursBoxBodyInfo}>11:00 AM - 01:00 PM</p>*/}
                        {/*<p className={classes.availableHoursBoxBodyInfo}>02:00 PM - 03:00 PM</p>*/}
                        {/*<p className={classes.availableHoursBoxBodyInfo}>03:00 PM - 04:30 PM</p>*/}
                        {/*<p className={classes.availableHoursBoxBodyInfo}>03:00 PM - 04:30 PM</p>*/}
                    </div>

        </div>


    )
}