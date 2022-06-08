import { ErrorText, isNotEmpty } from "@eachbase/utils";

export const getPhoneError = (error, backError, phoneErrorMsg) => {
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
};

export const getEmailError = (error, backError, emailErrorMsg) => {
   if (error === "email") {
      return ErrorText.field;
   } else if (backError?.length && backError[0]?.error === "User already exists") {
      return ErrorText.emailError;
   } else if (error === emailErrorMsg) {
      return emailErrorMsg;
   }
};

export const checkWebsite = (website = "") => {
   if (!isNotEmpty(website)) return;

   const HTTP_KEYWORD = "http://";

   return website.startsWith(HTTP_KEYWORD) ? website : `${HTTP_KEYWORD}${website}`;
};

export const fundingSourceTypes = ["Private Insurance", "Public Insurance", "School"];
