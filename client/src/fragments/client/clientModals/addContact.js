import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
   ValidationInput,
   CreateChancel,
   ModalHeader,
   AddressInput,
} from "@eachbase/components";
import { createClientStyle } from "./styles";
import {
   ErrorText,
   FindError,
   FindLoad,
   FindSuccess,
   getPhoneErrorText,
   isNotEmpty,
} from "@eachbase/utils";
import {
   clientActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";

export const AddContact = ({ handleClose, info }) => {
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? { ...info }
         : {
              firstName: "",
              lastName: "",
              phoneNumber: "",
              relationship: "",
           }
   );
   const [step, setStep] = useState("first");
   const [fullAddress, setFullAddress] = useState(
      info ? info.address?.formattedAddress : ""
   );
   const [enteredAddress, setEnteredAddress] = useState(
      info ? info.address?.formattedAddress : ""
   );
   const classes = createClientStyle();
   const dispatch = useDispatch();
   const params = useParams();

   const success = info
      ? FindSuccess("EDIT_CLIENT_CONTACT")
      : FindSuccess("CREATE_CLIENT_CONTACT");
   const loader = info
      ? FindLoad("EDIT_CLIENT_CONTACT")
      : FindLoad("CREATE_CLIENT_CONTACT");
   const backError = info
      ? FindError("EDIT_CLIENT_CONTACT")
      : FindError("CREATE_CLIENT_CONTACT");

   useEffect(() => {
      if (!!success.length) {
         handleClose();
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
      }
   }, [success]);

   const phoneErrorMsg = getPhoneErrorText(inputs.phoneNumber);
   const phoneErrorText =
      error === "phoneNumber"
         ? ErrorText.field
         : error === phoneErrorMsg
         ? phoneErrorMsg
         : backError.length &&
           backError[0].error[0] === "phoneNumber must be a valid phone number"
         ? "Phone number must be a valid phone number"
         : "";

   const handleChange = (e) => {
      setInputs((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
      if (
         error === e.target.name ||
         error === phoneErrorMsg ||
         (backError && backError.length)
      ) {
         setError("");
      }
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   };

   const handleAddressChange = (selectedAddress) => {
      setEnteredAddress(selectedAddress);
      error === "enteredAddress" && setError("");
   };

   const handleCreate = () => {
      if (step === "first") {
         const phoneIsValid =
            isNotEmpty(inputs.phoneNumber) &&
            inputs.phoneNumber.trim().length >= 10 &&
            !/[a-zA-Z]/g.test(inputs.phoneNumber);

         const contactDataIsValid =
            isNotEmpty(inputs.firstName) &&
            isNotEmpty(inputs.lastName) &&
            phoneIsValid &&
            isNotEmpty(inputs.relationship);

         if (contactDataIsValid) {
            setStep("second");
         } else {
            const contactDataErrorText = !isNotEmpty(inputs.firstName)
               ? "firstName"
               : !isNotEmpty(inputs.lastName)
               ? "lastName"
               : !isNotEmpty(inputs.phoneNumber)
               ? "phoneNumber"
               : !phoneIsValid
               ? phoneErrorMsg
               : !isNotEmpty(inputs.relationship)
               ? "relationship"
               : "";

            setError(contactDataErrorText);
         }
      } else if (step === "second") {
         if (isNotEmpty(fullAddress) && isNotEmpty(enteredAddress)) {
            const data = {
               firstName: inputs.firstName,
               lastName: inputs.lastName,
               phoneNumber: inputs.phoneNumber,
               relationship: inputs.relationship,
               address: fullAddress,
            };
            if (!info) {
               dispatch(clientActions.createClientContact(data, params.id));
            } else if (info) {
               dispatch(clientActions.editClientContact(data, info.id, params.id));
            }
         } else {
            setError(!enteredAddress ? "enteredAddress" : "Input is not field");
         }
      }
   };

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            secondStepInfo={"Address"}
            setStep={setStep}
            steps={step}
            handleClose={handleClose}
            title={info ? "Edit Contact" : "Add Contact"}
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.clientModalBlock}>
               {step === "first" ? (
                  <div className={classes.clientModalBox}>
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.firstName}
                        type={"text"}
                        label={"First Name*"}
                        name="firstName"
                        typeError={error === "firstName" ? ErrorText.field : ""}
                     />
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.lastName}
                        type={"text"}
                        label={"Last Name*"}
                        name="lastName"
                        typeError={error === "lastName" ? ErrorText.field : ""}
                     />
                     <ValidationInput
                        Length={11}
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.phoneNumber}
                        type={"number"}
                        label={"Phone Number*"}
                        name="phoneNumber"
                        typeError={phoneErrorText}
                     />
                     <ValidationInput
                        variant={"outlined"}
                        onChange={handleChange}
                        value={inputs.relationship}
                        type={"text"}
                        label={"Relationship*"}
                        name="relationship"
                        typeError={error === "relationship" ? ErrorText.field : ""}
                     />
                  </div>
               ) : (
                  <div className={classes.clientModalBox}>
                     <AddressInput
                        flex={true}
                        handleSelectValue={handleAddressChange}
                        info={info && info.address ? info : ""}
                        errorBoolean={error === "enteredAddress" ? ErrorText.field : ""}
                        onTrigger={setFullAddress}
                        enteredValue={enteredAddress}
                     />
                  </div>
               )}
            </div>
            <div className={classes.clientModalBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={step === "first" ? "Next" : info ? "Save" : "Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={handleClose}
                  buttonWidth="224px"
               />
            </div>
         </div>
      </div>
   );
};
