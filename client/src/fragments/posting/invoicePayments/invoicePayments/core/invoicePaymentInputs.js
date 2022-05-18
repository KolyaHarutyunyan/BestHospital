import React, { useState, useEffect } from "react";
import { CreateChancel } from "@eachbase/components";
import { invoicePaymentsCoreStyle } from "./styles";
import {
   makeEnum,
   FindLoad,
   isNotEmpty,
   FindSuccess,
   makeCapitalize,
   ImgUploader,
} from "@eachbase/utils";
import { useDispatch } from "react-redux";
import { FirstStepInputs, LastStepInputs } from "./common";
import { httpRequestsOnSuccessActions, invoicePaymentActions } from "@eachbase/store";
import moment from "moment";

export const InvoicePaymentInputs = ({
   info,
   activeStep,
   handleStep,
   closeModal,
   mappedClients,
}) => {
   const classes = invoicePaymentsCoreStyle();

   const dispatch = useDispatch();

   useEffect(() => {
      handleStep && handleStep("first");
   }, []);

   const loader = !!info
      ? FindLoad("EDIT_INVOICE_PAYMENT")
      : FindLoad("CREATE_INVOICE_PAYMENT");
   const success = !!info
      ? FindSuccess("EDIT_INVOICE_PAYMENT")
      : FindSuccess("CREATE_INVOICE_PAYMENT");

   useEffect(() => {
      if (!!success.length) {
         closeModal && closeModal();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const [inputs, setInputs] = useState(
      !!info
         ? {
              ...info,
              client: `${info.client?.firstName} ${info.client?.lastName}`,
              paymentDate: moment(info.paymentDate).format("YYYY-MM-DD"),
              paymentType: makeCapitalize(info.paymentType),
           }
         : {}
   );
   const [error, setError] = useState("");
   const [chosenImages, setChosenImages] = useState([]);
   const [loaderUpload, setLoaderUpload] = useState(false);

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
         : isNotEmpty(inputs.paymentAmount) &&
           isNotEmpty(inputs.client) &&
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
            : !isNotEmpty(inputs.paymentAmount)
            ? "paymentAmount"
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
      const invoicePmtData = {
         paymentAmount: +inputs.paymentAmount,
         client: inputs.client,
         paymentDate: inputs.paymentDate,
         paymentType: makeEnum(inputs.paymentType),
         checkNumber: inputs.checkNumber,
      };

      if (!!chosenImages.length) {
         setLoaderUpload(true);

         ImgUploader(chosenImages, true).then((uploadedImages) => {
            setLoaderUpload(false);

            const invoicePmtDataWithDocs = {
               ...invoicePmtData,
               documents: uploadedImages,
            };

            if (!!info) {
               dispatch(
                  invoicePaymentActions.editInvoicePayment(
                     info.id,
                     invoicePmtDataWithDocs
                  )
               );
            } else {
               dispatch(
                  invoicePaymentActions.createInvoicePayment(invoicePmtDataWithDocs)
               );
            }
         });
      } else {
         if (!!info) {
            dispatch(invoicePaymentActions.editInvoicePayment(info.id, invoicePmtData));
         } else {
            dispatch(invoicePaymentActions.createInvoicePayment(invoicePmtData));
         }
      }
   };

   return (
      <div>
         {isFirst && (
            <FirstStepInputs
               inputs={inputs}
               error={error}
               handleChange={handleChange}
               mappedClients={mappedClients}
               hasInfo={!!info}
            />
         )}
         {isLast && (
            <LastStepInputs handleImagesPass={(images) => setChosenImages(images)} />
         )}
         <CreateChancel
            butnClassName={classes.createOrCancelButnStyle}
            loader={loaderUpload || !!loader.length}
            create={createButnText}
            chancel={"Cancel"}
            onCreate={isLast ? handleSubmit : handleNext}
            onClose={closeModal}
         />
      </div>
   );
};
