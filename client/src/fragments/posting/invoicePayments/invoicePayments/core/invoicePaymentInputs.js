import React, { useState, useEffect } from "react";
import { CreateChancel } from "@eachbase/components";
import { invoicePaymentsCoreStyle } from "./styles";
import { makeEnum, FindLoad, isNotEmpty } from "@eachbase/utils";
import { useDispatch, useSelector } from "react-redux";
import { FirstStepInputs, LastStepInputs } from "./common";
import { invoicePaymentActions } from "@eachbase/store";

export const InvoicePaymentInputs = ({
   info,
   activeStep,
   handleStep,
   closeModal,
   client = [],
   invoices = [],
}) => {
   const classes = invoicePaymentsCoreStyle();

   useEffect(() => handleStep("first"), []);

   const dispatch = useDispatch();

   const loader = FindLoad("CREATE_INVOICE_PAYMENT");

   const [inputs, setInputs] = useState(!!info ? { ...info } : {});
   const [error, setError] = useState("");

   const filteredInvoices = invoices.filter(
      (invoice) => invoice.client === inputs.client
   );
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
           isNotEmpty(inputs.client) &&
           isNotEmpty(inputs.paymentDate) &&
           isNotEmpty(inputs.paymentType) &&
           isNotEmpty(inputs.checkNumber);

      if (firstStepDataIsValid) {
         handleStep("last");
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
            : !isNotEmpty(inputs.client)
            ? "client"
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
      const invoicePaymentData = {
         paymentAmount: +inputs.amount,
         payer: inputs.client,
         invoice: filteredInvoices[0]?._id,
         paymentDate: inputs.paymentDate,
         paymentType: makeEnum(inputs.paymentType),
         paymentReference: inputs.checkNumber,
         paymentDocument: uploadedFiles,
      };

      if (!!info) {
         dispatch(invoicePaymentActions.editInvoicePayment(info.id, invoicePaymentData));
      } else {
         dispatch(invoicePaymentActions.createInvoicePayment(invoicePaymentData));
      }
   };

   return (
      <div>
         {isFirst && (
            <FirstStepInputs
               inputs={inputs}
               error={error}
               handleChange={handleChange}
               client={client}
               hasInfo={!!info}
            />
         )}
         {isLast && (
            <LastStepInputs invoicePaymentId={"????"} uploadedFiles={uploadedFiles} />
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
