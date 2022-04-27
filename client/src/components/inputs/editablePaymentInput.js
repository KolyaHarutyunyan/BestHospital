import React, { useRef, useState, useEffect } from "react";
import { inputsStyle } from "./styles";
import { Images } from "@eachbase/utils";

export const EditablePaymentInput = ({ triggerInputValue, triggerEditBool }) => {
   const classes = inputsStyle();

   const paymentInputRef = useRef(null);

   const [editPmt, setEditPmt] = useState(false);
   const [enteredPayment, setEnteredPayment] = useState("");

   const inputBoxStyle = `${classes.editableInputBoxStyle} ${editPmt ? "active" : ""}`;

   useEffect(() => {
      editPmt && paymentInputRef.current.focus();
      triggerEditBool && triggerEditBool(editPmt);
   }, [editPmt]);

   useEffect(() => {
      triggerInputValue && triggerInputValue(enteredPayment);
   }, [enteredPayment]);

   return (
      <label className={inputBoxStyle}>
         <em>$</em>
         <input
            ref={paymentInputRef}
            type="number"
            className={classes.editableInputStyle}
            placeholder="0"
            value={enteredPayment}
            onChange={(e) => setEnteredPayment(e.target.value)}
            onBlur={() => setEditPmt(false)}
            disabled={!editPmt}
         />
         <img
            className={classes.editIconStyle}
            src={Images.editPmt}
            alt=""
            onClick={() => setEditPmt(true)}
         />
      </label>
   );
};
