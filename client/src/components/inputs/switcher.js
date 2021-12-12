import {Switch} from "@material-ui/core";
import React, {useState} from "react";
import {inputsStyle} from "./styles";

export const Switcher = ({handleClick, checked}) => {
    const [switchBool, setSwitchBool] = useState(checked ? checked : false)
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
