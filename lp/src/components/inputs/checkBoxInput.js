import React from "react";

export const CheckBoxInput = ({
   inputId,
   inputChecked,
   onInputChange,
   inputLabelText,
}) => {
   return (
      <label htmlFor={inputId} className="checkbox-label">
         <input
            type="checkbox"
            id={inputId}
            checked={inputChecked}
            onChange={onInputChange}
         />
         <div className="input-checkbox" />
         <span className="input-label-text">{inputLabelText}</span>
      </label>
   );
};
