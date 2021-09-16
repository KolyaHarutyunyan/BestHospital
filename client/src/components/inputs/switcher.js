import {Switch} from "@material-ui/core";
import React, {useState} from "react";
import {inputsStyle} from "./styles";

export const Switcher = ({handleClick}) => {
    const [switchBool, setSwitchBool] = useState('')
    const classes = inputsStyle();

    const handleChange = () => {
        handleClick()
        setSwitchBool(!!setSwitchBool)
    }

    return (

        <Switch
            onClick={handleChange}
            className={classes.switcher}
            checked={switchBool}
            name="checkedB"
            color="primary"
        />
    );
};
