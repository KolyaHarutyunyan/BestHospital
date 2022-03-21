import React from "react";
import { ErrMessage } from "@eachbase/components";
import { inputsStyle } from "./styles";

export const UserTextArea = ({
   className = "",
   id = "",
   name,
   label,
   value,
   onChange,
   typeError = "",
   hasText,
   maxCharsLabel,
}) => {
   const classes = inputsStyle();

   const condStyles = `${typeError ? "error" : hasText ? "filled" : ""}`;
   const userTextAreaClassName = `${classes.userTextAreaStyle} ${condStyles} ${className}`;

   return (
      <>
         <div className={userTextAreaClassName}>
            <label htmlFor={id}> {label} </label>
            <textarea name={name} id={id} value={value} onChange={onChange} />
         </div>
         <div className={classes.errorAndCharsBoxStyle}>
            <ErrMessage text={typeError} />
            <p className="maxCharacter">{maxCharsLabel}</p>
         </div>
      </>
   );
};
