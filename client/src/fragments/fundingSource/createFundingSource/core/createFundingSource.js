import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
   AddressInput,
   ValidationInput,
   SelectInput,
   CreateChancel,
   ModalHeader,
} from "@eachbase/components";
import { createFoundingSourceStyle } from "./styles";
import {
   DomainNameValidator,
   EmailValidator,
   enumValues,
   ErrorText,
   FindLoad,
   FindSuccess,
   getPhoneErrorText,
   isNotEmpty,
   manageType,
   URLValidator,
} from "@eachbase/utils";
import {
   fundingSourceActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { FindError } from "@eachbase/utils";
import { getPhoneError, getEmailError, checkWebsite } from "../constant";

export const CreateFundingSource = ({ handleClose, info }) => {
   const classes = createFoundingSourceStyle();

   const dispatch = useDispatch();

   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info ? { ...info, type: manageType(info.type) } : {}
   );
   const [fullAddress, setFullAddress] = useState(
      info && info.address ? info.address.formattedAddress : ""
   );
   const [enteredAddress, setEnteredAddress] = useState(
      info && info.address ? info.address.formattedAddress : ""
   );

   const success = info
      ? FindSuccess("EDIT_FUNDING_SOURCE")
      : FindSuccess("CREATE_FUNDING_SOURCE");
   const loader = info
      ? FindLoad("EDIT_FUNDING_SOURCE")
      : FindLoad("CREATE_FUNDING_SOURCE");
   const backError = info
      ? FindError("EDIT_FUNDING_SOURCE")
      : FindError("CREATE_FUNDING_SOURCE");

   useEffect(() => {
      return () => {
         dispatch(httpRequestsOnErrorsActions.removeError("CREATE_FUNDING_SOURCE"));
         dispatch(httpRequestsOnErrorsActions.removeError("EDIT_FUNDING_SOURCE"));
      };
   }, []);

   const phoneErrorMsg = getPhoneErrorText(inputs.phoneNumber);
   const emailErrorMsg = !EmailValidator.test(inputs.email) ? ErrorText.emailValid : "";

   const phoneErrorText = getPhoneError(error, backError, phoneErrorMsg);
   const emailErrorText = getEmailError(error, backError, emailErrorMsg);

   const handleCheck = (bool) => {
      if (bool === true) {
         setError("Not valid email");
      } else {
         setError("");
      }
   };

   const handleChange = (evt) => {
      setInputs((prevState) => ({
         ...prevState,
         [evt.target.name]: evt.target.value,
      }));
      if (
         error === evt.target.name ||
         error === phoneErrorMsg ||
         error === emailErrorMsg ||
         error === ErrorText.websiteError ||
         (backError && backError.length)
      ) {
         setError("");
      }
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   };

   const handleCreate = () => {
      const phoneIsValid =
         isNotEmpty(inputs.phoneNumber) &&
         inputs.phoneNumber.trim().length >= 10 &&
         !/[a-zA-Z]/g.test(inputs.phoneNumber);

      const emailIsValid = isNotEmpty(inputs.email) && EmailValidator.test(inputs.email);
      const websiteIsValid = isNotEmpty(inputs.website)
         ? URLValidator.test(checkWebsite(inputs.website))
         : true;

      const dataIsValid =
         isNotEmpty(inputs.name) &&
         phoneIsValid &&
         emailIsValid &&
         isNotEmpty(inputs.type) &&
         isNotEmpty(enteredAddress) &&
         isNotEmpty(fullAddress) &&
         websiteIsValid;

      if (dataIsValid) {
         const data = {
            name: inputs.name,
            email: inputs.email,
            phoneNumber: inputs.phoneNumber,
            type: manageType(inputs.type),
            contact: inputs.contact,
            website: checkWebsite(inputs.website),
            address: fullAddress,
            status: "ACTIVE",
         };

         if (info) {
            dispatch(fundingSourceActions.editFundingSource(info.id, data));
         } else {
            dispatch(fundingSourceActions.createFundingSource(data));
         }
      } else {
         const errorText = !isNotEmpty(inputs.name)
            ? "name"
            : !isNotEmpty(inputs.email)
            ? "email"
            : !emailIsValid
            ? emailErrorMsg
            : !isNotEmpty(inputs.phoneNumber)
            ? "phoneNumber"
            : !phoneIsValid
            ? phoneErrorMsg
            : !isNotEmpty(inputs.type)
            ? "type"
            : !isNotEmpty(enteredAddress)
            ? "enteredAddress"
            : !websiteIsValid
            ? ErrorText.websiteError
            : "";

         setError(errorText);
      }
   };

   const handleAddressChange = (selectedAddress) => {
      setEnteredAddress(selectedAddress);
      error === "enteredAddress" && setError("");
   };

   const closeModal = () => {
      handleClose && handleClose();
      backError &&
         backError.length &&
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
   };

   useEffect(() => {
      if (!!success.length) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess(success[0].type));
         handleClose();
      }
   }, [success]);

   return (
      <div className={classes.createFoundingSource}>
         <ModalHeader
            headerBottom={true}
            handleClose={closeModal}
            title={info ? "Edit Funding Source" : "Add Funding Source"}
         />
         <div className={classes.createFoundingSourceBody}>
            <div className={classes.createFoundingSourceBodyBlock}>
               <div className={classes.createFoundingSourceBodyBox}>
                  <ValidationInput
                     variant={"outlined"}
                     onChange={handleChange}
                     value={inputs.name}
                     type={"text"}
                     label={"Funding Source Name*"}
                     name="name"
                     typeError={error === "name" && ErrorText.field}
                  />
                  <ValidationInput
                     validator={EmailValidator}
                     variant={"outlined"}
                     name={"email"}
                     type={"email"}
                     label={"Email Address*"}
                     typeError={emailErrorText}
                     sendBoolean={handleCheck}
                     value={inputs.email}
                     onChange={handleChange}
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
                  <SelectInput
                     name={"type"}
                     label={"Type*"}
                     handleSelect={handleChange}
                     value={inputs.type}
                     language={enumValues.FUNDING_SOURCE_TYPES}
                     typeError={error === "type" ? ErrorText.selectField : ""}
                  />
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.contact}
                     variant={"outlined"}
                     type={"text"}
                     label={"Contact Person"}
                     name={"contact"}
                  />
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.website}
                     variant={"outlined"}
                     type={"text"}
                     label={"Website"}
                     name={"website"}
                     typeError={
                        error === ErrorText.websiteError ? ErrorText.websiteError : ""
                     }
                  />
               </div>
               <div className={classes.createFoundingSourceBodyBox}>
                  <AddressInput
                     errorBoolean={error === "enteredAddress" ? ErrorText.field : ""}
                     info={info && info.address ? info : ""}
                     handleSelectValue={handleAddressChange}
                     onTrigger={setFullAddress}
                     flex="block"
                     enteredValue={enteredAddress}
                  />
               </div>
            </div>
            <div className={classes.createFoundingSourceBodyBlock}>
               <CreateChancel
                  loader={!!loader.length}
                  create={info ? "Save" : "Add"}
                  chancel={"Cancel"}
                  onCreate={handleCreate}
                  onClose={closeModal}
                  buttonWidth="400px"
               />
            </div>
         </div>
      </div>
   );
};
