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
                    </div>

        </div>


    )
}