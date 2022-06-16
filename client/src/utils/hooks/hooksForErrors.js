import { ErrorText } from "@eachbase/utils";

export const hooksForErrors = {
   getPhoneError: (error, backError, phoneErrorMsg) => {
      if (error === "phoneNumber") {
         return ErrorText.field;
      } else if (
         backError?.length &&
         backError[0]?.error[0] === "phoneNumber must be a valid phone number"
      ) {
         return ErrorText.phoneError;
      } else if (error === phoneErrorMsg) {
         return phoneErrorMsg;
      } else {
         return "";
      }
   },

   getEmailError: (error, backError, emailErrorMsg) => {
      if (error === "email") {
         return ErrorText.field;
      } else if (backError?.length && backError[0]?.error === "User already exists") {
         return ErrorText.emailError;
      } else if (error === emailErrorMsg) {
         return emailErrorMsg;
      } else {
         return "";
      }
   },

   getEnrollmentErrorText: (error, backError) => {
      if (error === "funding") {
         return ErrorText.selectField;
      } else if (
         backError?.length &&
         backError[0]?.error === "Can not be two active enrollment"
      ) {
         return ErrorText.enrollmentError;
      } else if (
         backError?.length &&
         backError[0]?.error ===
            "Can not set primary because enrollment have a termination date"
      ) {
         return ErrorText.enrollmentPrimaryError;
      } else {
         return "";
      }
   },

   getRoleNameErrorText: (error, backError) => {
      if (error === "role") {
         return ErrorText.field;
      } else if (
         backError?.length &&
         backError[0]?.error === "A role with this title already exists"
      ) {
         return ErrorText.existenceError("A role with this title");
      } else {
         return "";
      }
   },

   getAuthServiceDefaultErrorText: (error, backError) => {
      if (error === "modifiersPost") {
         return ErrorText.availableModifierError;
      } else if (
         backError?.length &&
         backError[0]?.error ===
            "Can not be two authorization service with default modifiers"
      ) {
         return ErrorText.authServiceDefaultError;
      } else {
         return "";
      }
   },
};
