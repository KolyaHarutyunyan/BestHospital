import React, { useState } from "react";
import { ValidationInput, SendButton, SelectInput } from "@eachbase/components";
import { billingTransactionInputsStyle } from "./styles";
import { enumValues, makeEnum, ErrorText, FindLoad } from "@eachbase/utils";
import { billingActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

export const BillingTransactionInputs = ({ billingId }) => {
   const classes = billingTransactionInputsStyle();
   const loading = !!FindLoad("ADD_BILLING_TRANSACTION").length;
   const dispatch = useDispatch();

   const [inputs, setInputs] = useState({});
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
      const billingTransactionData = {
         type: makeEnum(selectedType),
         date: new Date(),
         amount: +inputs.amount,
         paymentRef: "string",
         creator: "string",
         note: "string",
      };
      const billingTransactionDataIsValid = !!selectedType && !!inputs.amount;
      if (billingTransactionDataIsValid) {
         dispatch(billingActions.addBillingTransaction(billingId, billingTransactionData));
         console.log(billingTransactionData, "  billingTransactionData");
      } else {
         setError(!selectedType ? "type" : !inputs.amount ? "amount" : "Input is not filled");
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
            loader={loading}
         />
      </div>
   );
};
