import React, { useState, useEffect } from "react";
import {
   ValidationInput,
   SelectInput,
   UserTextArea,
   CreateChancel,
} from "@eachbase/components";
import { billTransactionInputsStyle } from "./styles";
import {
   enumValues,
   makeEnum,
   ErrorText,
   FindLoad,
   isNotEmpty,
   FindSuccess,
} from "@eachbase/utils";
import { billActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import { useDispatch } from "react-redux";

export const BillTransactionInputs = ({ billId, closeModal }) => {
   const classes = billTransactionInputsStyle();

   const dispatch = useDispatch();

   const loader = FindLoad("ADD_BILL_TRANSACTION");
   const success = FindSuccess("ADD_BILL_TRANSACTION");

   useEffect(() => {
      if (success && success.length) {
         closeModal();
         httpRequestsOnSuccessActions.removeSuccess("ADD_BILL_TRANSACTION");
      }
   }, [success]);

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
      const billTransactionDataIsValid =
         isNotEmpty(selectedType) &&
         isNotEmpty(inputs.amount) &&
         isNotEmpty(inputs.paymentRef);

      if (billTransactionDataIsValid) {
         const billTransactionData = {
            type: makeEnum(selectedType),
            date: new Date(),
            amount: +inputs.amount,
            paymentRef: inputs.paymentRef,
            creator: "string",
            note: inputs.transactionNote,
         };

         dispatch(billActions.addBillTransaction(billId, billTransactionData));
      } else {
         const errorText = !selectedType
            ? "type"
            : !isNotEmpty(inputs.amount)
            ? "amount"
            : !isNotEmpty(inputs.paymentRef)
            ? "paymentRef"
            : "";

         setError(errorText);
      }
   };

   return (
      <div>
         <SelectInput
            name={"type"}
            label={"Type*"}
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
         <ValidationInput
            variant={"outlined"}
            name={"paymentRef"}
            type={"text"}
            label={"Payment Reference*"}
            onChange={handleChange}
            value={inputs.paymentRef}
            typeError={error === "paymentRef" && ErrorText.field}
         />
         <UserTextArea
            id={"transactionNote"}
            name={"transactionNote"}
            label={"Note"}
            value={inputs.transactionNote}
            onChange={handleChange}
            hasText={!!inputs.transactionNote}
            maxCharsLabel={"Max 250 characters"}
         />
         <CreateChancel
            butnClassName={classes.addOrCancelButnStyle}
            loader={!!loader.length}
            create={"Add"}
            chancel={"Cancel"}
            onCreate={handleSubmit}
            onClose={closeModal}
            buttonWidth="400px"
         />
      </div>
   );
};
