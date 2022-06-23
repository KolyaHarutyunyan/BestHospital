import { ErrorText } from "@eachbase/utils";

export const hooksForErrors = {
   getPhoneError: (error, backError, phoneErrorMsg) => {
      if (error === "phoneNumber") {
         return ErrorText.field;
      } else if (
         (backError?.length &&
            backError[0]?.error[0] === "phoneNumber must be a valid phone number") ||
         backError[0]?.error[0] === "phone must be a valid phone number" ||
         error === ErrorText.phoneError
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
      } else if (
         (backError?.length && backError[0]?.error === "User already exists") ||
         error === ErrorText.existenceError("Staff with this email")
      ) {
         return ErrorText.existenceError("Staff with this email");
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

   getModifierNameErrorText: (error, backError) => {
      if (error === "name") {
         return ErrorText.field;
      } else if (backError?.length && backError[0]?.error === "Modifier already exists") {
         return ErrorText.existenceError("Modifier with this name");
      } else {
         return "";
      }
   },

   getPaycodeActiveErrorText: (error, backError) => {
      if (error === "payCodeTypeId") {
         return ErrorText.selectField;
      } else if (
         backError?.length &&
         backError[0]?.error === "Can not be two active payCodes with same employment"
      ) {
         return ErrorText.paycodeActiveError;
      } else {
         return "";
      }
   },
};
