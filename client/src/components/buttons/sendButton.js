import React from "react";
import { buttonsStyle } from "./styles";
import { MinLoader } from "../loader";

export const SendButton = ({
   butnClassName,
   butnType,
   butnSendingText,
   butnDisabled,
   onClickButn,
   loader = false,
}) => {
   const classes = buttonsStyle();

   return (
      <button
         type={butnType}
         className={`${classes.sendButnStyle} ${butnClassName}`}
         disabled={butnDisabled}
         onClick={onClickButn}
      >
         {loader ? <MinLoader margin={"0"} color={Colors.TextWhite} /> : butnSendingText}
      </button>
   );
};
