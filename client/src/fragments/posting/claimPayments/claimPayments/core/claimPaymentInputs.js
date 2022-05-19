import React, { useState, useEffect } from "react";
import { CreateChancel } from "@eachbase/components";
import { claimPaymentsCoreStyle } from "./styles";
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
import { claimPaymentActions, httpRequestsOnSuccessActions } from "@eachbase/store";
import moment from "moment";

export const ClaimPaymentInputs = ({
   info,
   activeStep,
   handleStep,
   closeModal,
   mappedFunders,
}) => {
   const classes = claimPaymentsCoreStyle();

   const dispatch = useDispatch();

   useEffect(() => {
      handleStep && handleStep("first");
   }, []);

   const loader = !!info
      ? FindLoad("EDIT_CLAIM_PAYMENT")
      : FindLoad("CREATE_CLAIM_PAYMENT");
   const success = !!info
      ? FindSuccess("EDIT_CLAIM_PAYMENT")
      : FindSuccess("CREATE_CLAIM_PAYMENT");

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
              fundingSource: info.fundingSource?._id,
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
            : !isNotEmpty(inputs.paymentAmount)
            ? "paymentAmount"
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
      const claimPmtData = {
         paymentAmount: +inputs.paymentAmount,
         fundingSource: inputs.fundingSource,
         paymentDate: inputs.paymentDate,
         paymentType: makeEnum(inputs.paymentType),
         checkNumber: inputs.checkNumber,
      };

      if (!!chosenImages.length) {
         setLoaderUpload(true);

         ImgUploader(chosenImages, true).then((uploadedImages) => {
            setLoaderUpload(false);

            const claimPmtDataWithDocs = {
               ...claimPmtData,
               documents: uploadedImages,
            };

            if (!!info) {
               dispatch(
                  claimPaymentActions.editClaimPayment(info._id, claimPmtDataWithDocs)
               );
            } else {
               dispatch(claimPaymentActions.createClaimPayment(claimPmtDataWithDocs));
            }
         });
      } else {
         if (!!info) {
            dispatch(claimPaymentActions.editClaimPayment(info._id, claimPmtData));
         } else {
            dispatch(claimPaymentActions.createClaimPayment(claimPmtData));
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
               mappedFunders={mappedFunders}
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
