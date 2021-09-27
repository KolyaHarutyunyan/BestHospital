import React, {useState} from "react";
import {CloseButton, CreateChancel} from "../buttons";
import {modalsStyle} from './styles'
import {ValidationInput} from "../inputs";
import {Images} from "@eachbase/utils";
import moment from "moment";
import {Checkbox} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {availabilityScheduleActions} from "@eachbase/store/availabilitySchedule";
import {useParams} from "react-router-dom";

const inputStyle = {
    widths: '111px'
}

export const AvailabilitySchedule = ({availabilityData, onModel, handleClose}) => {

    const dispatch = useDispatch()

    const params = useParams()
    const [times, setTime] = useState( {
        "monday": [],
        "tuesday": [],
        "wednesday": [],
        "thursday": [],
        "friday": [],
        "saturday": [],
        "sunday": [],
    })

    console.log(availabilityData,'availabilityData');

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

    const changeData = (e, index, key) => {
        let obj = {...times}
        obj[key][index][e.target.name] = e.target.value
        if (e.target.value === '') {
            obj[key][index][e.target.name] = !e.target.checked;
        }
        setTime(obj)
    }

    const removeRow = (key, index,) => {
        let obj = {...times}
        obj[key].splice(index, 1)
        setTime(obj)
    }

    const handleSubmit = () => {
        dispatch(availabilityScheduleActions.createAvailabilitySchedule(times, params.id, onModel))
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
                                                        style={inputStyle}
                                                        className={classes.timeInputStyle}
                                                        errorFalse={true}
                                                        disabled={!item.available}
                                                        name='from'
                                                        value={item.from}
                                                        type="time"
                                                        onChange={(e) => {
                                                            changeData(e, index, key)
                                                        }}
                                                    />
                                                    <p className={classes.smallLine}>-</p>
                                                    <ValidationInput
                                                        style={inputStyle}
                                                        className={classes.timeInputStyle}
                                                        errorFalse={true}
                                                        disabled={!item.available}
                                                        name='to'
                                                        value={item.to}
                                                        type="time"
                                                        onChange={(e) => {
                                                            changeData(e, index, key)
                                                        }}
                                                    />
                                                    <span className={classes.removeTimeBtn} onClick={() => {
                                                        removeRow(key, index)
                                                    }}>Remove</span>
                                                    <div>
                                                        {/*<input style={{'-webkit-appearance': 'auto'}} checked={!item.available} type="checkbox" name='available'*/}
                                                        {/*       onChange={(e) => {*/}
                                                        {/*           changeData(e, index,key)*/}
                                                        {/*       }}/>*/}

                                                        <Checkbox
                                                            checked={!item.available}
                                                            name='available'
                                                            className={classes.customCheckbox}
                                                            onChange={(e) => {
                                                                changeData(e, index, key)
                                                            }}
                                                        />
                                                        <span className={classes.notAvailableText}>not available</span>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    {
                                        times[key].length ?
                                            <p onClick={() => addNewRow(key)} className={classes.moreHoursBtn}>Add more
                                                hours</p> : null
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div style={{padding: '20px 10px 0 10px'}}>
                <CreateChancel
                    create={'Save'}
                    chancel={"Cancel"}
                    onCreate={handleSubmit}
                    onClose={handleClose}
                    buttonWidth='269px'
                />
            </div>
        </div>
    );

}