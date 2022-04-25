import React, { useState, useEffect } from "react";
import { CreateChancel } from "@eachbase/components";
import { claimPaymentsCoreStyle } from "./styles";
import { makeEnum, FindLoad, isNotEmpty } from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { FirstStepInputs, LastStepInputs } from "./common";
import { claimPaymentActions } from "@eachbase/store";

export const ClaimPaymentInputs = ({
   activeStep,
   handleStep,
   closeModal,
   fundingSource = [],
}) => {
   const classes = claimPaymentsCoreStyle();

   useEffect(() => handleStep("first"), []);

   const dispatch = useDispatch();

   const loader = FindLoad("CREATE_CLAIM_PAYMENT");

   const [inputs, setInputs] = useState({});
   const [error, setError] = useState("");

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

   const handleNext = () => {
      const firstStepDataIsValid =
         isNotEmpty(inputs.paymentDate) &&
         isNotEmpty(inputs.amount) &&
         isNotEmpty(inputs.paymentType) &&
         isNotEmpty(inputs.checkNumber) &&
         isNotEmpty(inputs.fundingSource);

      if (firstStepDataIsValid) {
         handleStep("last");
      } else {
         const errorText = !isNotEmpty(inputs.paymentDate)
            ? "paymentDate"
            : !isNotEmpty(inputs.amount)
            ? "amount"
            : !isNotEmpty(inputs.paymentType)
            ? "paymentType"
            : !isNotEmpty(inputs.checkNumber)
            ? "checkNumber"
            : !isNotEmpty(inputs.fundingSource)
            ? "fundingSource"
            : "";

         setError(errorText);
      }
   };

   const handleSubmit = () => {
      const claimPaymentData = {
         paymentDate: inputs.paymentDate,
         amount: inputs.amount,
         paymentType: makeEnum(inputs.paymentType),
         checkNumber: inputs.checkNumber,
         fundingSource: inputs.fundingSource,
         file: "",
      };

      console.log(claimPaymentData, "  data");
      dispatch(claimPaymentActions.createClaimPayment(claimPaymentData));
   };

   return (
      <div>
         {isFirst && (
            <FirstStepInputs
               inputs={inputs}
               error={error}
               handleChange={handleChange}
               fundingSource={fundingSource}
            />
         )}
         {isLast && <LastStepInputs claimPaymentId={"????"} />}
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
