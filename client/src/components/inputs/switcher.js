import { Switch } from "@material-ui/core";
import React, { useState } from "react";
import { inputsStyle } from "./styles";

export const Switcher = ({ switcherClassName, handleClick, checked }) => {
   const [switchBool, setSwitchBool] = useState(false);
   const classes = inputsStyle();

   const handleChange = () => {
      if (handleClick) {
         handleClick();
      } else {
         setSwitchBool((prevState) => !prevState);
      }
   };

   return (
      <Switch
         onClick={handleChange}
         className={`${classes.switcher} ${switcherClassName}`}
         checked={checked || switchBool}
         name="checkedB"
         color="primary"
      />
   );
};
