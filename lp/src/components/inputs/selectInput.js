import React from "react";

export const SelectInput = ({
   selectInputClassName,
   selectInputLabelText,
   selectInputOptions = [],
   selectInputIsRequired,
   onChangeSelectInput,
   selectInputProps,
   selectInputName,
   selectInputId,
}) => {
   return (
      <div className="select-input">
         <label htmlFor={selectInputId} className="label-text">
            {selectInputLabelText}
         </label>
         <select
            id={selectInputId}
            name={selectInputName}
            {...selectInputProps}
            required={selectInputIsRequired}
            className={`html-select ${selectInputClassName}`}
            onChange={onChangeSelectInput}
         >
            {selectInputOptions.map((item, index) => (
               <option key={index} value={item}>
                  {item}
               </option>
            ))}
         </select>
      </div>
   );
};
