import React from "react";
import { inputsStyle } from "./styles";

export const CheckBoxInput = ({ inputId, inputChecked, onInputChange, inputLabel }) => {
   const classes = inputsStyle();

   return (
      <label htmlFor={inputId} className={classes.checkBoxLabelStyle}>
         <input type="checkbox" id={inputId} checked={inputChecked} onChange={onInputChange} />
         <div className={classes.inputCheckBoxStyle} />
         <span className={classes.inputLabelStyle}>{inputLabel}</span>
      </label>
   );
};
