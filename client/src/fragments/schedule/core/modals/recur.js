import {CloseButton, CreateChancel, ErrMessage, ValidationInput} from "@eachbase/components";
import React, {useState} from "react";
import {modalsStyle} from "../../../../components/modal/styles";
import {scheduleModalsStyle} from "./styles";
import FormControl from "@material-ui/core/FormControl";
import {Checkbox, FormControlLabel, FormGroup, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import {inputsStyle} from "../../../../components/inputs/styles";
import {appointmentRepeat} from "../../../../store/appointment/appointment.action";
import {appointmentActions} from "../../../../store";
import {useDispatch} from "react-redux";
import {number} from "prop-types";
import {FindLoad} from "../../../../utils";

export const Recur = ({openCloseRecur, date}) => {
    const global = modalsStyle()
    const classes = scheduleModalsStyle()
    const inputsClasses = inputsStyle()
    const [type, setType] = useState('Daily')
    const dispatch = useDispatch()


    const [inputs, setInputs] = useState({mode: 'DAILY'})
    const [occurrence, setOccurrence] = useState(0)
    const [state, setState] = React.useState([]);
    const [error, setError] = React.useState('');


    const handleChangeWeeks = (event) => {
        if(event.target.checked) {
            state.push(+event.target.value)
        }else{
            for( let i = 0; i < state.length; i++ ){
                if ( state[i] === +event.target.value ) {
                    state.splice(i, 1);
                }
            }
        }



        const repeatCheckWeek = [...state]
        const weeks = [];
        let totalCount = 0;
        const startDate = new Date(inputs.startDate);
        const endDate = new Date(inputs.endDate);
        let current = true;
        let dates = [], x;
        var dayCount = {
            0: {sum: 0, date: []}, 1: {sum: 0, date: []}, 2: {sum: 0, date: []},
            3: {sum: 0, date: []}, 4: {sum: 0, date: []}, 5: {sum: 0, date: []},
            6: {sum: 0, date: []}
        };

        for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            dayCount[d.getDay()].sum++;
            x = new Date(d.getTime());
            dayCount[d.getDay()].date.push(x);
            if (d.getDay() === 5) current = true;
            if (d.getDay() === 0 && current) {
                d.setDate(d.getDate() + (7 * inputs.repeatCountWeek ? inputs.repeatCountWeek : 0 ));
                current = false;
            }
        }
        repeatCheckWeek.map(days => {
            const day = Number(days);
            const obj = {};
            obj[day] = dayCount[days]
            weeks.push(obj[day].date);
            totalCount += dayCount[days].sum
        })
        for (let prop of weeks) {
            prop.map(date => {
                dates.push(date)
            })
        }
        setOccurrence(totalCount)

    };


    const handleChangeMounthDay = (e) => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}),);
        const appointments = [];
        let start = new Date(inputs.startDate);
        let end = new Date(inputs.endDate);
        let count = 0;
        let dates = [], x;
        for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
            if (d.getMonth() === end.getMonth() && end.getDate() < +e.target.value) {
                break
            }
            x = new Date(d.getTime());
            count++;
            dates.push(x);
            d.setMonth(d.getMonth() + 0);
        }
        setOccurrence(count)
    }
    const handleChangeMounth = (e) => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}),);
        const appointments = [];
        let start = new Date(inputs.startDate);
        let end = new Date(inputs.endDate);
        let count = 0;
        let dates = [], x;
        for (let d = start; d <= end; d.setMonth(d.getMonth() + 1)) {
            if (d.getMonth() === end.getMonth() && end.getDate() < +inputs.repeatDayMonth) {
                break
            }
            x = new Date(d.getTime());
            count++;
            dates.push(x);
            d.setMonth(d.getMonth() + +e.target.value);
        }
        setOccurrence(count)
    }

    const handleRecur = () => {

        const repeat = inputs.repeatCount ? inputs.repeatCount : inputs.repeatConsecutive ? inputs.repeatConsecutive : ''

        const typeBool =
            inputs.mode === 'DAILY' ?
                inputs.startDate && inputs.endDate && repeat
                :
                inputs.mode === 'WEEKLY' ?
                    inputs.startDate && inputs.endDate && inputs.repeatCountWeek && state.length
                    :
                    inputs.startDate && inputs.endDate && inputs.repeatDayMonth && inputs.repeatMonth

        const week ={
            startDate: new Date(inputs.startDate),
            endDate: new Date(inputs.endDate),
            mode: inputs.mode,
            repeatCountWeek: +inputs.repeatCountWeek,
            repeatCheckWeek: [ ...state ]
        }

        const mounthObject = {
            startDate: new Date(inputs.startDate),
            endDate: new Date(inputs.endDate),
            mode: inputs.mode,
            repeatDayMonth: +inputs.repeatDayMonth,
            repeatMonth: +inputs.repeatMonth,
        }

        !inputs.repeatDayMonth ? delete mounthObject['repeatDayMonth'] : ''
        !inputs.repeatMonth ? delete mounthObject['repeatMonth'] : ''

        const newObject =
            inputs.repeatConsecutive === "repeatConsecutive" ?
                {
                    startDate: new Date(inputs.startDate),
                    endDate: new Date(inputs.endDate),
                    mode: inputs.mode,
                    repeatConsecutive: true,
                } : {
                    startDate: new Date(inputs.startDate),
                    endDate: new Date(inputs.endDate),
                    mode: inputs.mode,
                    repeatCount: +inputs.repeatCount,
                }

        const obj = inputs.mode === 'WEEKLY' ? week : inputs.mode === 'MONTHLY' ? mounthObject : newObject

        if (typeBool) {
            dispatch(appointmentActions.appointmentRepeat(date._id, obj))
        } else {
            setError('Input is not field')
        }

    }


    const handleChange = e => {
        e.target.name === 'mode' && setOccurrence(0)
        // e.target.name === 'repeatConsecutive' && setOccurrence(0), delete inputs['repeatCount'] && delete inputs['repeatCountCheckbox']
        // e.target.name === 'repeatCount' && setOccurrence(0), delete inputs['repeatConsecutive']
        e.target.name === 'repeatCountCheckbox' && setOccurrence(0), delete inputs['repeatConsecutive']

        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
        );
    }

    const handleChangeConsecutive = e => {
        e.target.name === 'repeatConsecutive' &&
        // setOccurrence(0),
        delete inputs['repeatCount'] && delete inputs['repeatCountCheckbox']
        setInputs(
            prevState => ({...prevState, [e.target.name]: e.target.value}),
        );
        const startDate = new Date(inputs.startDate);
        const endDate = new Date(new Date(inputs.endDate).setHours(23, 59, 59));
        let count = 0;
        const curDate = new Date(startDate.getTime());
        let dates = [], x;
        while (curDate <= endDate) {
            const dayOfWeek = curDate.getDay();
            if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                x = new Date(curDate.getTime());
                dates.push(x)
                count++
            }
            ;
            curDate.setDate(curDate.getDate() + 1);
        }
        setOccurrence(count)
    }

    const handleChangeDay = e => {
        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}));
        const startDate = new Date(inputs.startDate);
        const endDate = new Date(new Date(inputs.endDate).setHours(23, 59, 59));
        let count = 0;
        let dates = [], x;

        for (let d = startDate; d <= endDate; d.setDate(d.getDate() + +e.target.value + 1)) {
            count++;
            x = new Date(d.getTime());
            dates.push(x)
        }
        setOccurrence(count)
    }

    const handleChangeWeek = e => {

        setInputs(prevState => ({...prevState, [e.target.name]: e.target.value}));
        const repeatCheckWeek = [...state]
        const weeks = [];
        let totalCount = 0;
        const startDate = new Date(inputs.startDate);
        const endDate = new Date(inputs.endDate);
        let current = true;
        let dates = [], x;
        var dayCount = {
            0: {sum: 0, date: []}, 1: {sum: 0, date: []}, 2: {sum: 0, date: []},
            3: {sum: 0, date: []}, 4: {sum: 0, date: []}, 5: {sum: 0, date: []},
            6: {sum: 0, date: []}
        };

        for (var d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
            dayCount[d.getDay()].sum++;
            x = new Date(d.getTime());
            dayCount[d.getDay()].date.push(x);
            if (d.getDay() === 5) current = true;
            if (d.getDay() === 0 && current) {
                d.setDate(d.getDate() + (7 * e.target.value));
                current = false;
            }
        }
        repeatCheckWeek.map(days => {
            const day = Number(days);
            const obj = {};
            obj[day] = dayCount[days]
            weeks.push(obj[day].date);
            totalCount += dayCount[days].sum
        })
        for (let prop of weeks) {
            prop.map(date => {
                dates.push(date)
            })
        }
        setOccurrence(totalCount)
    }

    const loader = FindLoad('APPOINTMENT_REPEAT')

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
                        onChange={handleChange}
                        value={inputs.startDate}
                        type={"date"}
                        label={""}
                        name='startDate'
                        // typeError={error === 'startDate' && ErrorText.field}
                    />
                    <ValidationInput
                        style={classes.endDate}
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.endDate}
                        type={"date"}
                        label={""}
                        name='endDate'
                        // typeError={error === 'startDate' && ErrorText.field}
                    />
                </div>

                <p className={classes.recurTitle}>Mode</p>

                <div>
                    <FormControl component="fieldset">
                        <RadioGroup onChange={handleChange} row aria-label="gender" name="mode">
                            <FormControlLabel
                                className={inputsClasses.radioInputLabel}
                                value="DAILY"
                                control={<Radio
                                    checked={inputs.mode === 'DAILY'}
                                    classes={{root: inputsClasses.radio, checked: inputsClasses.checked}}
                                />} label="Daily"/>
                            <FormControlLabel
                                className={inputsClasses.radioInputLabel}
                                value="WEEKLY"
                                control={<Radio
                                    checked={inputs.mode === 'WEEKLY'}
                                    classes={{root: inputsClasses.radio, checked: inputsClasses.checked}}
                                />} label="Weekly"/>
                            <FormControlLabel
                                className={inputs.radioInputLabel} value="MONTHLY"
                                control={<Radio
                                    checked={inputs.mode === 'MONTHLY'}
                                    classes={{root: inputsClasses.radio, checked: inputsClasses.checked}}
                                />} label="Monthly"/>
                        </RadioGroup>
                    </FormControl>
                </div>

                <div className={classes.dayWeekMounth}>
                    <p className={classes.recurTitle}>Patterns</p>
                    {inputs.mode === 'WEEKLY' ?

                        <div>
                            <div style={{display: 'flex', alignItems: 'center', marginTop: '16px'}}>
                                <span className={classes.weeks}>Recur every</span>
                                <input
                                    type={'number'}
                                    value={inputs.repeatCountWeek === undefined ? '' : inputs.repeatCountWeek}
                                    name={'repeatCountWeek'}
                                    onChange={handleChangeWeek}
                                    className={classes.smallInput}
                                />
                                <span className={classes.days}>week(s)</span>
                            </div>

                            <FormGroup className={classes.formGroup} onChange={handleChangeWeeks} name='weeks'>
                                <FormControlLabel name='Sun' value={0} control={<Checkbox/>} label="Sun"/>
                                <FormControlLabel name='Mon' value={1} control={<Checkbox/>} label="Mon"/>
                                <FormControlLabel name='Tue' value={2} control={<Checkbox/>} label="Tue"/>
                                <FormControlLabel name='Wed' value={3} control={<Checkbox/>} label="Wed"/>
                                <FormControlLabel name='Thu' value={4} control={<Checkbox/>} label="Thu"/>
                                <FormControlLabel name='Fri' value={5} control={<Checkbox/>} label="Fri"/>
                                <FormControlLabel name='Sat' value={6} control={<Checkbox/>} label="Sat"/>
                            </FormGroup>
                        </div>

                        :
                        inputs.mode === 'MONTHLY' ?
                            <div>
                                <div style={{display: 'flex', alignItems: 'center', marginTop: '16px'}}>
                                    <span className={classes.weeks}>Recur day</span>
                                    <input
                                        type={'number'}
                                        value={inputs.repeatDayMonth === undefined ? '' : inputs.repeatDayMonth}
                                        name={'repeatDayMonth'}
                                        onChange={handleChangeMounthDay}
                                        className={classes.smallInput}
                                    />
                                    <span style={{marginRight: '8px'}} className={classes.days}>of every</span>
                                    <input
                                        type={'number'}
                                        value={inputs.repeatMonth === undefined ? '' : inputs.repeatMonth}
                                        name={'repeatMonth'}
                                        onChange={handleChangeMounth}
                                        className={classes.smallInput}
                                    />
                                    <span className={classes.days}>month(s)</span>

                                </div>

                            </div>


                            :
                            <div>
                                <FormControl component="fieldset">
                                    <RadioGroup style={{display: 'flex', flexDirection: 'column'}}
                                                onChange={handleChange} row aria-label="gender">


                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <FormControlLabel
                                                onChange={handleChange}
                                                name='repeatCountCheckbox'
                                                className={inputsClasses.radioInputLabel} value="repeatCountCheckbox"
                                                control={<Radio
                                                    checked={inputs.repeatCountCheckbox === 'repeatCountCheckbox'}
                                                    classes={{
                                                        root: inputsClasses.radio,
                                                        checked: inputsClasses.checked
                                                    }}
                                                />} label="Recur every"/>

                                            <input
                                                type={'number'}
                                                value={inputs.repeatCount === undefined ? '' : inputs.repeatCount}
                                                disabled={
                                                    inputs.startDate && inputs.endDate ? false :
                                                        inputs.repeatCountCheckbox !== 'repeatCountCheckbox'

                                                }
                                                name={'repeatCount'}
                                                onChange={handleChangeDay}
                                                className={classes.smallInput}
                                            />
                                            <span className={classes.days}>day(s)</span>
                                        </div>
                                        <FormControlLabel
                                            onChange={handleChangeConsecutive}
                                            name='repeatConsecutive'
                                            className={inputsClasses.radioInputLabel}
                                            value="repeatConsecutive"
                                            control={<Radio
                                                checked={inputs.repeatConsecutive === 'repeatConsecutive'}
                                                classes={{root: inputsClasses.radio, checked: inputsClasses.checked}}
                                            />} label="Recur every weekday"/>
                                    </RadioGroup>
                                </FormControl>

                            </div>

                    }

                </div>
                <div className={classes.occurance}>
                    <p>Occurrence:</p>
                    <span>{occurrence}</span>
                </div>

                <ErrMessage text={error ? error : ''}/>


                <CreateChancel
                    loader={!!loader.length}
                    create={'Recur'}
                    chancel={"Cancel"}
                    onCreate={handleRecur}
                    onClose={openCloseRecur}
                    buttonWidth='192px'
                />

            </div>
        </div>
    )
}