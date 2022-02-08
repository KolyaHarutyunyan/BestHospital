import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {inputsStyle} from "./styles";

export const RadioButton = ({styles,value,radioData, onChange}) => {

    const classes = inputsStyle()

    return (
        <FormControl component="fieldset">
            <RadioGroup style={{...styles}} aria-label="gender" name="gender1" value={value} onChange={(ev)=> onChange(ev)}>
                {
                    radioData &&  radioData.map((item, index) => {
                        return (
                            <FormControlLabel key={index} className={classes.radioInputLabel} index={index} value={item.value} control={
                                <Radio disableRipple classes={{root: classes.radio, checked: classes.checked}}/>
                            } label={item.label}/>
                        )
                    })
                }

            </RadioGroup>
        </FormControl>
    );
}