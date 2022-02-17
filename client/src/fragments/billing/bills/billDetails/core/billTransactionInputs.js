import React, { useState } from "react";
import { ValidationInput, SendButton, SelectInput } from "@eachbase/components";
import { billTransactionInputsStyle } from "./styles";
import { enumValues, makeEnum, ErrorText, FindLoad } from "@eachbase/utils";
import { billActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

export const BillTransactionInputs = ({ billId }) => {
   const classes = billTransactionInputsStyle();
   const dispatch = useDispatch();
   const loader = !!FindLoad("ADD_BILLING_TRANSACTION").length;

   const [inputs, setInputs] = useState({ amount: "" });
   const [error, setError] = useState("");
   const [selectedType, setSelectedType] = useState("");

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleSelect = (evt) => {
      setSelectedType(evt.target.value);
      error === "type" && setError("");
   };

   const handleSubmit = () => {
      const billTransactionData = {
         type: makeEnum(selectedType),
         date: new Date(),
         amount: +inputs.amount,
         paymentRef: "string",
         creator: "string",
         note: "string",
      };
      const billTransactionDataIsValid = !!selectedType && !!inputs.amount;
      if (billTransactionDataIsValid) {
         dispatch(billActions.addBillTransaction(billId, billTransactionData));
         console.log(billTransactionData, "  billTransactionData");
      } else {
         setError(
            !selectedType
               ? "type"
               : !inputs.amount
               ? "amount"
               : "Input is not filled"
         );
      }
   };

   return (
      <div>
         <SelectInput
            name={"type"}
            label={"Transaction Type"}
            handleSelect={handleSelect}
            value={selectedType}
            typeError={error === "type" && ErrorText.selectField}
            language={enumValues.BILLING_TRANSACTION_TYPES}
         />
         <ValidationInput
            variant={"outlined"}
            name={"amount"}
            type={"number"}
            label={"Amount*"}
            onChange={handleChange}
            value={inputs.amount}
            typeError={error === "amount" && ErrorText.field}
         />
         <SendButton
            butnClassName={""}
            butnType={"button"}
            butnSendingText={"Add"}
            onClickButn={handleSubmit}
            loader={loader}
         />
      </div>
   );
};
