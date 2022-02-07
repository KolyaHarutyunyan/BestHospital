import React from "react";
import { inputsStyle } from "./styles";

export const UserTextArea = ({
   label,
   value,
   onChange,
   hasError,
   hasText,
   name,
   className,
   id,
}) => {
   const classes = inputsStyle();
   const condStyles = `${hasError ? "error" : hasText ? "filled" : ""}`;

   return (
      <div className={`${classes.userTextAreaStyle} ${condStyles} ${className}`}>
         <label htmlFor={id}> {label} </label>
         <textarea name={name} id={id} value={value} onChange={onChange} />
      </div>
   );
};
