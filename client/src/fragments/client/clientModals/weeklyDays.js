import React, {useState} from "react";
import {Colors, ErrorText, Images,} from "@eachbase/utils";

import {modalsStyle} from "../../../components/modal/styles";
import {ValidationInput} from "../../../components";
import {Checkbox} from "@material-ui/core";



export const WeeklyDays = ({day,addHours, addForm , info}) => {
    const [inputs, setInputs] = useState(info ? {...info} : {});
    const classes = modalsStyle()
    const handleChange = e => setInputs(
        prevState => ({...prevState, [e.target.name]: e.target.value}),
        // error === e.target.name && setError(''),
    );

    return (


                <div className={classes.AddAvailabilityScheduelBox}>
                    <p className={classes.AddAvailabilityScheduelDayName} style={info && info.length ? {marginTop: 10} : {}}>{day}</p>
                    <div className={classes.AddAvailabilityScheduelRight}>
                        {addForm &&  <div className={classes.AddAvailabilityScheduelForm}>
                            <ValidationInput
                                className={classes.inputTextFieldBlue}
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.startDate}
                                type={"time"}
                                name='startDate'
                                // typeError={error === 'startDate' && ErrorText.field}
                            />
                            <p className={classes.line}>-</p>
                            <ValidationInput
                                className={classes.inputTextFieldBlue}
                                variant={"outlined"}
                                onChange={handleChange}
                                value={inputs.startDate}
                                type={"time"}
                                name='startDate'
                                // typeError={error === 'startDate' && ErrorText.field}
                            />
                            <p className={classes.removeBtn}>Remove</p>
                            <Checkbox />
                            <p>Not Available</p>
                        </div>}
                        {info && info.length && info.map((item,index)=>{
                            return(
                                <div className={classes.AddAvailabilityScheduelForm}>
                                    <ValidationInput
                                        className={classes.inputTextFieldBlue}
                                        variant={"outlined"}
                                        onChange={handleChange}
                                        value={inputs.startDate}
                                        type={"time"}
                                        name='startDate'
                                        // typeError={error === 'startDate' && ErrorText.field}
                                    />
                                    <p className={classes.line}>-</p>
                                    <ValidationInput
                                        className={classes.inputTextFieldBlue}
                                        variant={"outlined"}
                                        onChange={handleChange}
                                        value={inputs.startDate}
                                        type={"time"}
                                        name='startDate'
                                        // typeError={error === 'startDate' && ErrorText.field}
                                    />
                                    <p className={classes.removeBtn}>Remove</p>
                                 <div className={classes.checkBox}>
                                     <Checkbox color={Colors.ThemeBlue} />
                                 </div>
                                    <p className={classes.notAvailable}>Not Available</p>
                                </div>
                            )
                        })}

                        <div className={classes.AddHourseBox}>
                            {info && info.length ? <></> : <img onClick={addHours} src={Images.addHours} alt="icon" className={classes.iconsCursor}/> }
                            <p style={info && info.length ? {color: Colors.ThemeBlue} : {}} className={classes.AddHourseBoxText}>{ info && info.length ? 'Add more hours' : "Add Hours"} </p>
                        </div>
                    </div>
                </div>

    );
}
