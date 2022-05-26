import React from "react";
import { buttonsStyle } from "./styles";

export const AddButtonLight = ({
   addButnLightClassName,
   onAddButnLightClick,
   addButnLightInnerText,
}) => {
   const classes = buttonsStyle();

   const addButtonLightStyle = `${classes.lightButnStyle} ${addButnLightClassName}`;

   return (
      <button type="button" className={addButtonLightStyle} onClick={onAddButnLightClick}>
         {addButnLightInnerText}
      </button>
   );
};
