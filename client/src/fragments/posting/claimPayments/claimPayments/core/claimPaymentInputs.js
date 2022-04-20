import React, { useState, useEffect } from "react";
import {
   ValidationInput,
   SelectInput,
   CreateChancel,
} from "@eachbase/components";
import { claimPaymentsCoreStyle } from "./styles";
import {
   enumValues,
   makeEnum,
   ErrorText,
   FindLoad,
   isNotEmpty,
} from "@eachbase/utils";
import { useDispatch } from "react-redux";

const smallInputStyles = { width: "215px", marginBottom: "-12px" };
const inputStyles = { width: "446px", marginBottom: "-12px" };
const errorStyles = { marginTop: "12px" };

export const ClaimPaymentInputs = ({ activeStep, handleStep, closeModal, fundingSource=[] }) => {
   const classes = claimPaymentsCoreStyle();

   const dispatch = useDispatch();

   const loader = FindLoad("CREATE_CLAIM_PAYMENT");

   const [inputs, setInputs] = useState({});
   const [error, setError] = useState("");
   const [selectedPmtType, setSelectedPmtType] = useState("");
   const [selectedFunder, setSelectedFunder] = useState("");

   useEffect(() => {
      handleStep("first");
   }, []);

   const isFirst = activeStep === "first";
   const isLast = activeStep === "last";

   const createButnText = isFirst ? "Next" : isLast ? "Create" : "";

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleSelect = (evt, setSelectedValue) => {
      setSelectedValue(evt.target.value);
      error === evt.target.name && setError("");
   };

   const handleNext = () => {
      const firstStepDataIsValid = 
         isNotEmpty(inputs.paymentDate) &&
         isNotEmpty(inputs.amount) &&
         isNotEmpty(selectedPmtType) && 
         isNotEmpty(inputs.checkNumber) &&
         isNotEmpty(selectedFunder);

      if (firstStepDataIsValid) {
         handleStep("last");
      } else {
         const errorText = !isNotEmpty(inputs.paymentDate)
            ? "paymentDate"
            : !isNotEmpty(inputs.amount)
            ? "amount"
            : !isNotEmpty(selectedPmtType)
            ? "paymentType"
            : !isNotEmpty(inputs.checkNumber)
            ? "checkNumber"
            : !isNotEmpty(selectedFunder)
            ? "fundingSource"
            : "";

         setError(errorText);
      }
   };

   const handleSubmit = () => {
      const lastStepDataIsValid = true;

      if (lastStepDataIsValid) {
         const claimPaymentData = {
            paymentDate: inputs.paymentDate,
            amount: inputs.amount,
            paymentType: makeEnum(selectedPmtType),
            checkNumber: inputs.checkNumber,
            fundingSource: selectedFunder,
            file: ""
         };

         console.log(claimPaymentData, "data");
         // dispatch(.....);
      } else {
         const errorText = "";

         setError(errorText);
      }
   };

   return (
      <div>
         {isFirst && (
            <div>
                <ValidationInput
                  styles={inputStyles}
                  errorStyle={errorStyles}
                  variant={"outlined"}
                  name={"paymentDate"}
                  onChange={handleChange}
                  value={inputs.paymentDate}
                  type={"date"}
                  typeError={error === "paymentDate" && ErrorText.field}
               />
               <ValidationInput
                  styles={inputStyles}
                  errorStyle={errorStyles}
                  variant={"outlined"}
                  name={"amount"}
                  type={"number"}
                  label={"Amount*"}
                  onChange={handleChange}
                  value={inputs.amount}
                  typeError={error === "amount" && ErrorText.field}
               />
               <div style={{ display: "flex" }}>
                  <SelectInput
                     styles={{...smallInputStyles, marginRight: "16px" }}
                     errorStyle={errorStyles}
                     name={"paymentType"}
                     label={"Payment Type*"}
                     handleSelect={(e) => handleSelect(e, setSelectedPmtType)}
                     value={selectedPmtType}
                     language={enumValues.POSTING_PAYMENT_TYPES}
                     typeError={error === "paymentType" && ErrorText.field}
                  />
                   <ValidationInput
                     styles={smallInputStyles}
                     errorStyle={errorStyles}
                     variant={"outlined"}
                     name={"checkNumber"}
                     type={"number"}
                     label={"Check Number*"}
                     onChange={handleChange}
                     value={inputs.checkNumber}
                     typeError={error === "checkNumber" && ErrorText.field}
                  />
               </div>
               <SelectInput
                  name={"fundingSource"}
                  label={"Funding Source*"}
                  handleSelect={(e) => handleSelect(e, setSelectedFunder)}
                  value={selectedFunder}
                  language={fundingSource}
                  typeError={error === "fundingSource" && ErrorText.selectField}
               />
            </div>
         )}
         {isLast && (
            <div>last step..</div>
         )}
         <CreateChancel
            butnClassName={classes.createOrCancelButnStyle}
            loader={!!loader.length}
            create={createButnText}
            chancel={"Cancel"}
            onCreate={isLast ? handleSubmit : handleNext}
            onClose={closeModal}
         />
      </div>
   );
};
