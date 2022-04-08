import React from "react";
import { inputsStyle } from "./styles";
import { isNotEmpty } from "@eachbase/utils";

export const CheckBoxInput = ({
   inputId,
   inputClassName,
   inputChecked = false,
   onInputChange,
   inputLabel,
   uniqueCheckbox,
}) => {
   const classes = inputsStyle();

   const checkboxClassName = `
      ${classes.checkboxStyle} ${inputClassName} ${uniqueCheckbox ? "unique" : ""}
   `;

   return (
      <label htmlFor={inputId} className={checkboxClassName}>
         <input
            type="checkbox"
            id={inputId}
            checked={inputChecked}
            onChange={onInputChange}
         />
         <div className={classes.inputCheckBoxStyle} />
         {isNotEmpty(inputLabel) && (
            <span className={classes.inputLabelStyle}>{inputLabel}</span>
         )}
      </label>
   );
};
