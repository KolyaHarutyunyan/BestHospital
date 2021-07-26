import React from "react";
import {useState} from "react";
import {FormControlLabel, FormLabel, Radio, RadioGroup} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import {createOfficeStyle} from "./styles";

export const RadioButtons =({disabled})=>{
    const classes = createOfficeStyle()
    const [selectedValue, setSelectedValue] = useState('Other');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    return(
        <div  className={classes.radioButtonStyle}>
            <FormControl component="fieldset">
                <RadioGroup row aria-label="position" name="position" defaultValue="top">
                    <FormControlLabel
                        disabled={disabled}
                        checked={selectedValue === 'Same'}
                        onChange={handleChange}
                        value="Same"
                        control={<Radio color="primary" />}
                        label="Same as Shipping Address"
                        labelPlacement="End"
                    />

                    <FormControlLabel
                        disabled={disabled}
                        checked={selectedValue === 'Other'}
                        onChange={handleChange}
                        value="Other"
                        control={<Radio color="primary" />}
                        label="Other"
                        labelPlacement="End"
                    />
                </RadioGroup>
            </FormControl>

        </div>
    )
}