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