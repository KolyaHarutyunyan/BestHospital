import React, {useState} from "react";
import {CloseButton, CreateChancel} from "../buttons";
import {modalsStyle} from './styles'
import {ValidationInput} from "../inputs";
import {Images} from "@eachbase/utils";
import moment from "moment";

export const AvailabilitySchedule = ({handleClose}) => {

    const [times, setTime] = useState({
        "monday": [],
        "tuesday": [],
        "wednesday": [],
        "thursday": [],
        "friday": [],
        "saturday": [],
        "sunday": [],
    })

    const [error, setError] = useState('')

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

    const classes = modalsStyle()

    const addNewRow = (key) => {
        let newObj = {...times};
        newObj[key].push({
            from: moment().format('HH:mm'),
            to: moment().format('HH:mm'),
            available: true,
        })
        setTime(newObj)
    }

    console.log(times,'times')

    const changeData = (e, index, key) => {
        let obj = {...times}
        obj[key][index][e.target.name] = e.target.value
        if (e.target.value === 'on') {
            obj[key][index][e.target.name] = !e.target.checked;
        }
        setTime(obj)
        error === e.target.name && setError('')
    }

    const removeRow = (key, index,) => {
        let obj = {...times}
        obj[key].splice(index, 1)
        setTime(obj)
    }

    const handleSubmit = () =>{
        console.log(times,'times');
    }

    return (

        <div className={classes.availableScheduleWrapper}>
            <h1 className={classes.availableScheduleTitle}>Edit available schedule</h1>
            <div className={classes.closeBtn}>
                <CloseButton handleCLic={handleClose}/>
            </div>
            <div className={classes.scrollable}>
                {
                    Object.keys(times).map(function (key, weekDayIndex) {
                        return (
                            <div key={weekDayIndex} className={classes.timeRow}>
                                <p className={classes.dayName}>{shortDayNames(key)}</p>
                                <div style={{display: 'flex'}}>
                                    {
                                        !times[key].length &&
                                        <div className={classes.addTime} onClick={() => addNewRow(key)}>
                                            <img src={Images.addIcon} alt=""/>
                                            <span>Add Hours</span>
                                        </div>
                                    }
                                </div>
                                <div>
                                    {
                                        times[key].map((item, index) => {
                                            return (
                                                <div key={index} className={classes.times}>
                                                    <ValidationInput
                                                        className={classes.timeInputStyle}
                                                        errorFalse={true}
                                                        disabled={!item.available}
                                                        name='from'
                                                        value={item.from}
                                                        type="time"
                                                        onChange={(e) => {changeData(e, index,key)}}
                                                    />
                                                    <ValidationInput
                                                        className={classes.timeInputStyle}
                                                        errorFalse={true}
                                                        disabled={!item.available}
                                                        name='to'
                                                        value={item.to}
                                                        type="time"
                                                        onChange={(e) => {changeData(e, index,key)}}
                                                    />
                                                    <span className={classes.removeTimeBtn} onClick={() => {
                                                        removeRow(key,index)
                                                    }}>Remove</span>
                                                    <input style={{'-webkit-appearance': 'auto'}} checked={!item.available} type="checkbox" name='available'
                                                           onChange={(e) => {
                                                               changeData(e, index,key)
                                                           }}/>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        times[key].length ? <span onClick={() => addNewRow(key)} className={classes.moreHoursBtn}>Add more hours</span> : null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <CreateChancel
                // loader={httpOnLoad.length > 0}
                create={'Save'}
                chancel={"Cancel"}
                onCreate={handleSubmit}
                onClose={handleClose}
                buttonWidth='269px'
            />
        </div>
    );

}