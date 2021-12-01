import {CloseButton, CreateChancel, ValidationInput} from "@eachbase/components";
import React, {useState} from "react";
import {modalsStyle} from "../../../../components/modal/styles";
import {scheduleModalsStyle} from "./styles";
import FormControl from "@material-ui/core/FormControl";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {inputsStyle} from "../../../../components/inputs/styles";

export const Recur = ({openCloseRecur}) => {
    const global = modalsStyle()
    const classes = scheduleModalsStyle()
    const inputs = inputsStyle()
    const [type, setType] = useState('Daily')

    // daily
    //     const appointments = [];
    //     const day = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    //     const startDate = new Date(dto.startDate);
    //     const endDate = new Date(new Date(dto.endDate).setHours(23, 59, 59));
    //     const diffDays = Math.floor(Math.abs((startDate - endDate) / day));
    //     let count = 0;
    //     let dates = [], x;
    //     for (let d = startDate; d <= endDate; d.setDate(d.getDate() + dto.repeatCount + 1)) {
    //         count++;
    //         x = new Date(d.getTime());
    //         dates.push(x)
    //     }
    //     // for (let i = 0; i < count; i++) {
    //     //     this.cloneDoc(appointment, dates[i], appointments);
    //     // }
    //     // await this.saveDb(appointments);
    //     return { occurency: count };
    //
    //
    //
    // // daily consecutive
    //     let count = 0;
    //     const curDate = new Date(startDate.getTime());
    //     let dates = [], x;
    //     while (curDate <= endDate) {
    //         const dayOfWeek = curDate.getDay();
    //         if (dayOfWeek !== 0 && dayOfWeek !== 6) {
    //             x = new Date(curDate.getTime());
    //             dates.push(x)
    //             count++
    //         };
    //         curDate.setDate(curDate.getDate() + 1);
    //     }
    //     return { count, dates };
    // }
    //
    //
    // // weekly
    // const appointments = [];
    // const weeks = [];
    // let totalCount = 0;
    // const startDate = new Date(dto.startDate);
    // const endDate = new Date(dto.endDate);
    // let current = true;
    // let dates = [], x;
    // var dayCount = {
    //     0: { sum: 0, date: [] }, 1: { sum: 0, date: [] }, 2: { sum: 0, date: [] },
    //     3: { sum: 0, date: [] }, 4: { sum: 0, date: [] }, 5: { sum: 0, date: [] },
    //     6: { sum: 0, date: [] }
    // }; //0 is sunday and 6 is saturday
    // for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    //     dayCount[d.getDay()].sum++;
    //     x = new Date(d.getTime());
    //     dayCount[d.getDay()].date.push(x);
    //     if (d.getDay() == 5) current = true;
    //     if (d.getDay() == 0 && current) {
    //         d.setDate(d.getDate() + (7 * dto.repeatCountWeek));
    //         current = false;
    //     }
    // }
    // dto.repeatCheckWeek.map(days => {
    //     const day = Number(days);
    //     const obj = {};
    //     obj[day] = dayCount[days]
    //     weeks.push(obj[day].date);
    //     totalCount += dayCount[days].sum
    // })
    // for (let prop of weeks) {
    //     prop.map(date => {
    //         dates.push(date)
    //     })
    // }
    // // for (let i = 0; i < totalCount; i++) {
    // //     this.cloneDoc(appointment, dates[i], appointments)
    // // }
    // // await this.saveDb(appointments)
    // return { occurency: totalCount };
    //
    //
    // // monthly
    //
    // const appointments = [];
    // let start = new Date(dto.startDate);
    // let enpd = new Date(dto.endDate);
    // let count = 0;
    // let dates = [], x;
    // for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
    //     if (d.getMonth() == end.getMonth() && end.getDate() < dto.repeatDayMonth) {
    //         break
    //     }
    //     x = new Date(d.getTime());
    //     count++;
    //     dates.push(x);
    //     d.setMonth(d.getMonth() + dto.repeatMonth);
    // }
    // // for (let i = 0; i < count; i++) {
    // //     this.cloneDoc(appointment, dates[i], appointments)
    // // }
    // // await this.saveDb(appointments)
    // return { occurrency: count }

    return (
        <div className={global.inactiveModalBody}>
            <div className={global.positionedButton}>
                <CloseButton handleCLic={openCloseRecur}/>
            </div>
            <p className={global.availableScheduleTitle}>Recur Event</p>
            <p className={classes.subTitle}>To recur event, please fulfill the below fields.</p>

            <div className={classes.recurBody}>
                <p className={classes.recurTitle}>Date Range</p>

                <div className={classes.dateInputs}>
                    <ValidationInput
                        variant={"outlined"}
                        // onChange={handleChange}
                        // value={inputs.startDate}
                        type={"date"}
                        label={""}
                        name='startDate'
                        // typeError={error === 'startDate' && ErrorText.field}
                    />
                    <ValidationInput
                        style={classes.endDate}
                        variant={"outlined"}
                        // onChange={handleChange}
                        // value={inputs.startDate}
                        type={"date"}
                        label={""}
                        name='startDate'
                        // typeError={error === 'startDate' && ErrorText.field}
                    />
                </div>

                <p className={classes.recurTitle}>Mode</p>
                <div>
                    <FormControl component="fieldset">
                        <RadioGroup onChange={(e) => setType(e.target.value)} row aria-label="gender" name="gender1">
                            <FormControlLabel className={inputs.radioInputLabel} value="Daily"
                                              control={<Radio
                                                  checked={type === 'Daily'}
                                                  classes={{root: inputs.radio, checked: inputs.checked}}
                                              />} label="Daily"/>
                            <FormControlLabel className={inputs.radioInputLabel} value="Weekly" control={<Radio
                                classes={{root: inputs.radio, checked: inputs.checked}}
                            />} label="Weekly"/>
                            <FormControlLabel className={inputs.radioInputLabel} value="Monthly" control={<Radio
                                classes={{root: inputs.radio, checked: inputs.checked}}
                            />} label="Monthly"/>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={classes.dayWeekMounth}>
                    <p className={classes.recurTitle}>Patterns</p>
                    {type === 'Daily' ?
                        <div> Daily </div> :
                        type === 'Weekly' ?
                            <div>Weekly </div> :
                            type === 'Monthly' ?
                                <div>Monthly</div> : ''

                    }

                </div>
                <div className={classes.occurance}>
                    <p>Occurrence:</p>
                    <span>0</span>
                </div>

                <CreateChancel
                    create={'Recur'}
                    chancel={"Cancel"}
                    // onCreate={handleSubmit}
                    onClose={openCloseRecur}
                    buttonWidth='192px'
                />

            </div>
        </div>
    )
}