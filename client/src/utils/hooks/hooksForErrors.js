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
      }
   },

   getEmailError: (error, backError, emailErrorMsg) => {
      if (error === "email") {
         return ErrorText.field;
      } else if (backError?.length && backError[0]?.error === "User already exists") {
         return ErrorText.emailError;
      } else if (error === emailErrorMsg) {
         return emailErrorMsg;
      }
   },
};
