import React from "react";
import { ValidationInput } from "@eachbase/components";
import { EmailValidator, ErrorText, hooksForErrors } from "@eachbase/utils";

export const CreateStaffFirstStep = ({
   inputs,
   handleChange,
   error,
   backError,
   phoneErrorMsg,
   emailErrorMsg,
}) => {
   const phoneErrorText = hooksForErrors.getPhoneError(error, backError, phoneErrorMsg);
   const emailErrorText = hooksForErrors.getEmailError(error, backError, emailErrorMsg);

   return (
      <div>
         <ValidationInput
            variant={"outlined"}
            onChange={handleChange}
            value={inputs?.firstName}
            type={"text"}
            label={"First Name*"}
            name="firstName"
            typeError={error === "firstName" ? ErrorText.field : ""}
         />
         <ValidationInput
            variant={"outlined"}
            onChange={handleChange}
            value={inputs?.middleName}
            type={"text"}
            label={"Middle Name"}
            name="middleName"
         />
         <ValidationInput
            variant={"outlined"}
            onChange={handleChange}
            value={inputs?.lastName}
            type={"text"}
            label={"Last Name*"}
            name="lastName"
            typeError={error === "lastName" ? ErrorText.field : ""}
         />
         <ValidationInput
            validator={EmailValidator}
            variant={"outlined"}
            name={"email"}
            type={"email"}
            label={"Primary Email*"}
            typeError={emailErrorText}
            value={inputs?.email}
            onChange={handleChange}
         />
         <ValidationInput
            validator={EmailValidator}
            variant={"outlined"}
            name={"secondaryEmail"}
            type={"email"}
            label={"Secondary Email"}
            typeError={error === "secondaryEmail" ? ErrorText.emailValid : ""}
            value={inputs?.secondaryEmail}
            onChange={handleChange}
         />
         <ValidationInput
            Length={11}
            onChange={handleChange}
            value={inputs?.phoneNumber && inputs?.phoneNumber.replace("+", "")}
            variant={"outlined"}
            type={"number"}
            label={"Primary Phone Number*"}
            name={"phoneNumber"}
            typeError={phoneErrorText}
         />
         <ValidationInput
            Length={11}
            onChange={handleChange}
            value={inputs?.secondaryPhone && inputs?.secondaryPhone.replace("+", "")}
            variant={"outlined"}
            type={"number"}
            label={"Secondary Phone Number"}
            name={"secondaryPhone"}
            typeError={error === "secondaryPhone" ? "At least 10 digits" : ""}
         />
      </div>
   );
};
