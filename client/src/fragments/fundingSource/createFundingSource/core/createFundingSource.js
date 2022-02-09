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
   EmailValidator,
   ErrorText,
   FindLoad,
   FindSuccess,
   getPhoneErrorText,
   isNotEmpty,
} from "@eachbase/utils";
import {
   fundingSourceActions,
   httpRequestsOnErrorsActions,
   httpRequestsOnSuccessActions,
} from "@eachbase/store";
import { FindError } from "@eachbase/utils";

export const CreateFundingSource = ({ handleClose, info }) => {
   const [error, setError] = useState("");
   const [inputs, setInputs] = useState(
      info
         ? { ...info }
         : {
              name: "",
              email: "",
              phoneNumber: "",
              type: "",
              contact: "",
              website: "",
           }
   );
   const [fullAddress, setFullAddress] = useState(
      info && info.address ? info.address.formattedAddress : ""
   );
   const [enteredAddress, setEnteredAddress] = useState(
      info && info.address ? info.address.formattedAddress : ""
   );
   const classes = createFoundingSourceStyle();
   const dispatch = useDispatch();

   const success = info ? FindSuccess("EDIT_FUNDING_SOURCE") : FindSuccess("CREATE_FUNDING_SOURCE");
   const loader = info ? FindLoad("EDIT_FUNDING_SOURCE") : FindLoad("CREATE_FUNDING_SOURCE");
   const backError = info ? FindError("EDIT_FUNDING_SOURCE") : FindError("CREATE_FUNDING_SOURCE");

   const phoneErrorMsg = getPhoneErrorText(inputs.phoneNumber);
   const emailErrorMsg = !EmailValidator.test(inputs.email) ? ErrorText.emailValid : "";

   const phoneErrorText =
      error === "phoneNumber"
         ? ErrorText.field
         : error === phoneErrorMsg
         ? phoneErrorMsg
         : backError.length && backError[0].error[0] === "phoneNumber must be a valid phone number"
         ? "Phone number must be a valid phone number"
         : "";
   const emailErrorText =
      error === "email"
         ? ErrorText.field
         : error === emailErrorMsg
         ? emailErrorMsg
         : backError.length && backError[0].error === "User already exists"
         ? "User already exists"
         : "";

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
         (backError && backError.length)
      ) {
         setError("");
      }
      if (backError && backError.length) {
         dispatch(httpRequestsOnErrorsActions.removeError(backError[0].type));
      }
   };

   const handleCreate = () => {
      const data = {
         name: inputs.name,
         email: inputs.email,
         phoneNumber: inputs.phoneNumber,
         type: inputs.type,
         contact: inputs.contact,
         website: inputs.website,
         address: fullAddress,
         status: "ACTIVE",
      };
      const phoneIsValid =
         !!inputs.phoneNumber &&
         inputs.phoneNumber.trim().length >= 10 &&
         !/[a-zA-Z]/g.test(inputs.phoneNumber);
      const emailIsValid = !!inputs.email && EmailValidator.test(inputs.email);
      const dataIsValid =
         !!inputs.name &&
         phoneIsValid &&
         emailIsValid &&
         !!inputs.type &&
         !!inputs.contact &&
         !!inputs.website &&
         !!enteredAddress &&
         isNotEmpty(fullAddress);
      const errorText = !inputs.name
         ? "name"
         : !inputs.email
         ? "email"
         : !emailIsValid
         ? emailErrorMsg
         : !inputs.phoneNumber
         ? "phoneNumber"
         : !phoneIsValid
         ? phoneErrorMsg
         : !inputs.type
         ? "type"
         : !inputs.contact
         ? "contact"
         : !inputs.website
         ? "website"
         : !enteredAddress
         ? "enteredAddress"
         : "";
      if (dataIsValid) {
         if (info) {
            dispatch(fundingSourceActions.editFundingSource(info.id, data));
         } else {
            dispatch(fundingSourceActions.createFundingSource(data));
         }
      } else {
         setError(errorText);
      }
   };

   const list = [{ name: "first" }, { name: "second" }];

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
      if (!success) return;
      if (info) {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("EDIT_FUNDING_SOURCE"));
      } else {
         dispatch(httpRequestsOnSuccessActions.removeSuccess("CREATE_FUNDING_SOURCE"));
      }
      handleClose();
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
                     list={list}
                     typeError={error === "type" ? ErrorText.field : ""}
                  />
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.contact}
                     variant={"outlined"}
                     type={"text"}
                     label={"Contact Person*"}
                     name={"contact"}
                     typeError={error === "contact" && ErrorText.field}
                  />
                  <ValidationInput
                     onChange={handleChange}
                     value={inputs.website}
                     variant={"outlined"}
                     type={"text"}
                     label={"Website*"}
                     name={"website"}
                     typeError={error === "website" && ErrorText.field}
                  />
               </div>
               <div className={classes.createFoundingSourceBodyBox}>
                  <AddressInput
                     errorBoolean={error === "enteredAddress" ? ErrorText.field : ""}
                     info={info && info.address ? info : ""}
                     handleSelectValue={handleAddressChange}
                     onTrigger={setFullAddress}
                     flex="block"
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
