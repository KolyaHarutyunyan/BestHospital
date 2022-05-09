import React, { useState, useEffect } from "react";
import { CreateChancel } from "@eachbase/components";
import { claimPaymentsCoreStyle } from "./styles";
import { makeEnum, FindLoad, isNotEmpty } from "@eachbase/utils";
import { useDispatch, useSelector } from "react-redux";
import { FirstStepInputs, LastStepInputs } from "./common";
import { claimPaymentActions } from "@eachbase/store";

export const ClaimPaymentInputs = ({
   info,
   activeStep,
   handleStep,
   closeModal,
   fundingSource = [],
}) => {
   const classes = claimPaymentsCoreStyle();

   useEffect(() => handleStep && handleStep("first"), []);

   const dispatch = useDispatch();

   const loader = FindLoad("CREATE_CLAIM_PAYMENT");

   const [inputs, setInputs] = useState(!!info ? { ...info } : {});
   const [error, setError] = useState("");

   const uploadedFiles = useSelector((state) => state.upload.uploadedInfo);

   const isFirst = activeStep === "first";
   const isLast = activeStep === "last";

   const createButnText = isFirst ? "Next" : isLast ? (!!info ? "Save" : "Create") : "";

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      error === e.target.name && setError("");
   };

   const handleNext = () => {
      const firstStepDataIsValid = !!info
         ? isNotEmpty(inputs.paymentDate) &&
           isNotEmpty(inputs.paymentType) &&
           isNotEmpty(inputs.checkNumber)
         : isNotEmpty(inputs.amount) &&
           isNotEmpty(inputs.fundingSource) &&
           isNotEmpty(inputs.paymentDate) &&
           isNotEmpty(inputs.paymentType) &&
           isNotEmpty(inputs.checkNumber);

      if (firstStepDataIsValid) {
         handleStep && handleStep("last");
      } else {
         const errorText = !!info
            ? !isNotEmpty(inputs.paymentDate)
               ? "paymentDate"
               : !isNotEmpty(inputs.paymentType)
               ? "paymentType"
               : !isNotEmpty(inputs.checkNumber)
               ? "checkNumber"
               : ""
            : !isNotEmpty(inputs.amount)
            ? "amount"
            : !isNotEmpty(inputs.fundingSource)
            ? "fundingSource"
            : !isNotEmpty(inputs.paymentDate)
            ? "paymentDate"
            : !isNotEmpty(inputs.paymentType)
            ? "paymentType"
            : !isNotEmpty(inputs.checkNumber)
            ? "checkNumber"
            : "";

         setError(errorText);
      }
   };

   const handleSubmit = () => {
      const claimPaymentData = {
         paymentAmount: +inputs.amount,
         fundingSource: inputs.fundingSource,
         paymentDate: inputs.paymentDate,
         paymentType: makeEnum(inputs.paymentType),
         paymentReference: inputs.checkNumber,
         paymentDocument: uploadedFiles,
      };

      if (!!info) {
         dispatch(claimPaymentActions.editClaimPayment(info.id, claimPaymentData));
      } else {
         dispatch(claimPaymentActions.createClaimPayment(claimPaymentData));
      }
   };

   return (
      <div>
         {isFirst && (
            <FirstStepInputs
               inputs={inputs}
               error={error}
               handleChange={handleChange}
               fundingSource={fundingSource}
               hasInfo={!!info}
            />
         )}
         {isLast && (
            <LastStepInputs claimPaymentId={"????"} uploadedFiles={uploadedFiles} />
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
