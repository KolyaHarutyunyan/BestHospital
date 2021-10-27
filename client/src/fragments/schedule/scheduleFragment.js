import {ListView, scheduleStyle} from "./core";
import {Selectable} from "./core/calendar";
import React, {useState} from "react";
import {SimpleModal} from "@eachbase/components";
import {CreateEvent} from "./core/modals/createEvent";

export const ScheduleFragment = ({}) => {
    const classes = scheduleStyle()
    const [type, setType] = useState('list')
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState('')

    const changeScreen = (ev) => {
        setType(ev)
    }
    const handleOpenClose = (date) =>{
        if(date){
            setDate(date)
        }
        setOpen(!open)
    }

    return (
        <div className={classes.wrapper}>
            {type === 'calendar' ?
                <Selectable
                    handleOpenClose={handleOpenClose}
                    handleChangeScreenView={(e) => changeScreen(e)}
                />
                :
                <ListView
                    handleOpenClose={handleOpenClose}
                    changeScreen={changeScreen}
                />
            }
            <SimpleModal
                handleOpenClose={handleOpenClose}
                openDefault={open}
                content={
                  <CreateEvent
                      date={date}
                      handleOpenClose={handleOpenClose}
                  />
                }
            />
        </div>
    )
}